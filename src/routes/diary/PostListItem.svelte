<script lang="ts">
  import type { PostSummary } from '../api/posts/util';
  import Tag from './Tag.svelte';

  export let post: PostSummary;

  const { metadata } = post;
  const { title, summary, date, tags, status } = metadata;

  const draft = status === 'draft';

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

<li class="post" class:draft>
  <a href="/diary/{post.slug}">
    <span class="post-header">
      <span class="date">{formatDate(date)}</span>
      {#if draft}
        <span class="draft-marker">Draft</span>
      {/if}
    </span>
    <span class="title">{title}</span>
    {#if summary}
      <span class="summary">{summary}</span>
    {/if}
    {#if tags?.length}
      <span class="tags">
        {#each tags as tag}
          <Tag {tag} link={false} />
        {/each}
      </span>
    {/if}
  </a>
</li>

<style lang="less">
  .post {
    list-style: none;
    margin: 0;
    padding: 0;
    width: max-content;
    max-width: min(45ch, 90vw);

    &:nth-child(3n + 2) {
      --deg: -1.5deg;
    }
    &:nth-child(3n + 3) {
      --deg: 0deg;
    }
    &:nth-child(3n + 4) {
      --deg: 1.5deg;
    }

    @media @not-mobile {
      &:nth-child(4n + 2) {
        margin-left: -10ch;
      }
      &:nth-child(4n + 4) {
        margin-right: -10ch;
      }
    }
    @media @mobile {
      margin-inline: auto;
    }

    --shadow-offset: 0.1em;
    --shadow-size: -1px;
    .rotated-shadow;

    a {
      padding: 0.75em 1em;
      background-color: white;
      border-radius: 2px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 0.25em;
      line-height: 1.4;
    }

    .post-header {
      color: rgba(0 0 0 / 0.75);
      font-family: var(--sans-font);
      font-size: 0.7em;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      gap: 2em;

      .draft-marker {
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.9em;
      }
    }

    .title {
      text-wrap: balance;
      &::after {
        content: ' →';
        font-family: var(--sans-font);
      }
    }

    .summary {
      font-size: 0.8em;
      font-family: var(--sans-font);
      color: rgba(0 0 0 / 0.75);
      text-wrap: pretty;
    }

    .tags {
      font-size: 0.6em;
      color: rgba(0 0 0 / 0.6);
      display: flex;
      flex-direction: row;
      gap: 0.5em;
      margin-top: 0.5em;
    }

    &.draft {
      opacity: 0.6;
    }
  }
</style>
