<script lang="ts">
  import ButtonBar from '$lib/components/ButtonBar.svelte';
  import type { PostSummary } from '../api/posts/util';
  import Tag from './Tag.svelte';

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

<ul>
  {#each sorted as post}
    {@const { metadata } = post}
    {@const { title, summary, date } = metadata}
    <li class="post">
      <a href="/diary/{post.slug}">
        <span class="date">{formatDate(date)}</span>
        <span class="title">{title}</span>
        {#if summary}
          <span class="summary">{summary}</span>
        {/if}
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

    @media @mobile {
      flex-direction: column;
      gap: 1em;
    }

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
    flex-direction: column;
    gap: 1.5em;
    padding-inline: 2rem;
    max-width: 65ch;
    @media @mobile {
      padding-inline: 1rem;
      flex-direction: column;
      grid-column: full-width;
    }
  }

  .post {
    width: max-content;
    &:nth-child(even) {
      margin-left: auto;
    }
    &:nth-child(3n + 1) {
      --deg: -1.5deg;
    }
    &:nth-child(3n + 2) {
      --deg: 0deg;
    }
    &:nth-child(3n + 3) {
      --deg: 1.5deg;
    }
    &:nth-child(4n + 1) {
      margin-left: -1em;
    }
    &:nth-child(4n + 4) {
      margin-right: -1em;
    }

    --shadow-offset: 0.1em;
    --shadow-size: -1px;
    .rotated-shadow;

    a {
      max-width: min(50ch, 90vw);
      padding: 0.75em 1em;
      background-color: white;
      border-radius: 2px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 0.25em;
      line-height: 1.4;

      .title {
        text-wrap: balance;
        &::after {
          content: ' →';
          font-family: var(--sans-font);
        }
      }

      .summary {
        font-size: 14px;
        font-family: var(--sans-font);
        color: rgba(0 0 0 / 0.75);
        text-wrap: pretty;
      }

      .date {
        color: rgba(0 0 0 / 0.75);
        font-family: var(--sans-font);
        font-size: 12px;
      }
    }
  }
</style>
