<script lang="ts">
  /* oxlint-disable svelte/no-navigation-without-resolve, no-undef */
  import { dev } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  $: isIndex = /^\/diary\/?$/.test($page.url.pathname);

  async function onClickNewPost(event: MouseEvent) {
    event.preventDefault();

    const title = prompt('Enter post title', '');
    if (typeof title === 'string' && title.length > 0) {
      await newPost(title);
    }
  }

  async function newPost(title: string) {
    const response = await fetch(`/api/posts/new`, {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    });

    if (!response.ok) {
      throw new Error('Invalid response');
    }

    const json = await response.json();
    goto(`/diary/${json.slug}`);
  }
</script>

<nav>
  <div class="card">
    <h1>
      {#if isIndex}
        <span class="title">Pascal’s Diary</span>
      {:else}
        <a href="/diary">Pascal’s Diary</a>
      {/if}
    </h1>

    {#if dev}
      <p class="dev-actions">
        <button type="button" on:click={onClickNewPost}>New</button>
        <a class="button-link" href="/diary/styleguide">Style Guide</a>
      </p>
    {/if}

    <a href="/">← Home</a>
  </div>
</nav>

<style lang="less">
  @fixed-threshold: 1200px;
  @fixed: ~'(min-width: @{fixed-threshold})';
  @not-fixed: ~'(max-width: @{fixed-threshold})';

  nav {
    --deg: -2deg;
    .rotated-shadow;
    white-space: nowrap;
    @media @fixed {
      position: fixed;
      left: -1rem;
      top: 4rem;
      z-index: 100;
    }
    @media @not-fixed {
      margin-top: -2.5rem;
      margin-left: -3rem;
      margin-bottom: 2rem;
      margin-right: 1.5rem;
      width: min-content;
    }

    .card {
      background-color: rgb(255 255 255);
      padding: 1em;
      border-radius: 4px;
      color: rgb(0 0 0 / 0.7);

      @media @fixed {
        padding-left: 2rem;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      @media @not-fixed {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding-top: 3em;
        padding-left: 3em;
        padding-bottom: 0.25em;
        margin-top: -2em;
      }
    }

    h1 {
      font-weight: 500;
      font-size: 28px;
    }

    a {
      text-decoration: none;
      color: var(--blue);
    }

    a[href='/'] {
      font-family: var(--sans-font);
      font-size: 16px;
    }

    .dev-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
      @media @mobile {
        display: none;
      }
    }

    .button-link {
      font-family: var(--sans-font);
      font-weight: normal;
      font-size: 13px;
      padding-block: 2px;
      padding-inline: 8px;
      background-color: rgba(255 255 255 / 0.9);
      color: black;
      border-radius: 4px;
      border: 1px solid rgba(0 0 0 / 0.3);
      box-shadow: 0px 1px 0 0px hsla(0 0% 0% / 0.2);

      &:hover {
        border-color: hsla(0 0% 0% / 0.5);
      }

      &:focus {
        outline: 1px solid black;
      }

      &:active {
        box-shadow: none;
        transform: translate(0px, 1px);
      }
    }
  }
</style>
