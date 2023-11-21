<script lang="ts">
  import ButtonBar from '$lib/components/ButtonBar.svelte';
  import Tag from './Tag.svelte';
  import type { PostSummary } from '../api/posts/util';

  export let posts: PostSummary[] = [];
  export let tag = '';

  let sortOrder = 'newest';

  const sortOptions = [
    { value: 'oldest', label: 'Oldest' },
    { value: 'newest', label: 'Newest' },
  ];

  function onClickSortOrder(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    sortOrder = target.value;
  }

  $: sorted = posts.slice().sort((a, b) => {
    const reverse = sortOrder === 'newest';
    const multiplier = reverse ? 1 : -1;
    if (b.metadata.date < a.metadata.date) return -1 * multiplier;
    if (b.metadata.date > a.metadata.date) return 1 * multiplier;
    return 0;
  });

  const dateFormatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function formatDate(timestamp: string) {
    try {
      const date = new Date(timestamp);
      return dateFormatter.format(date);
    } catch (e) {
      console.log(timestamp);
      return timestamp;
    }
  }
</script>

<header>
  <span class="title">
    {#if tag}
      <span class="label">Posts tagged with</span>
      <Tag {tag} />
    {:else}
      <span class="label">All Posts</span>
    {/if}
  </span>

  <div class="buttons">
    <ButtonBar options={sortOptions} selected={sortOrder} on:click={onClickSortOrder} />
  </div>
</header>

<ul class="bleed-right">
  {#each sorted as post}
    <li>
      <a href="/diary/{post.slug}">
        <span class="title">{post.metadata.title}</span>
        <span class="date">{formatDate(post.metadata.date)}</span>
      </a>
    </li>
  {/each}
</ul>

<style lang="less">
  header {
    font-size: 14px;
    font-weight: normal;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2em;

    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.75rem;
    }

    .label {
      font-size: 24px;
    }

    .buttons {
      font-family: var(--sans-font);
    }
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5em;
    padding-right: 2rem;
    @media @mobile {
      flex-direction: column;
      grid-column: full-width;
    }
  }

  li {
    width: max-content;
    &:nth-child(odd) {
      --deg: 1deg;
      margin-left: -0.5rem;
    }
    &:nth-child(even) {
      --deg: -1deg;
      margin-left: 0.5em;
    }

    --shadow-offset: 0.1em;
    --shadow-size: -1px;
    .rotated-shadow;

    a {
      max-width: 90vw;
      padding: 0.5em 1em;
      background-color: white;
      border-radius: 2px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 0.25em;
      line-height: 1.2;

      .title {
        &::after {
          content: ' →';
        }
      }

      .date {
        color: black;
        font-family: var(--sans-font);
        opacity: 0.5;
        font-size: 12px;
        padding-left: 2em;
      }
    }
  }
</style>
