<script lang="ts">
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
      <p>
        <button type="button" on:click={onClickNewPost}>New post</button>
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
  }
</style>
