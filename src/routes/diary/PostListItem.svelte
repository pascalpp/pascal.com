<script lang="ts">
  import type { PostSummary } from '../api/posts/util';

  export let post: PostSummary;

  let { metadata } = post;
  let { title, summary, date } = metadata;

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

<li class="post">
  <a href="/diary/{post.slug}">
    <span class="date">{formatDate(date)}</span>
    <span class="title">{title}</span>
    {#if summary}
      <span class="summary">{summary}</span>
    {/if}
  </a>
</li>

<style lang="less">
  .post {
    list-style: none;
    margin: 0;
    padding: 0;
    width: max-content;
    &:nth-child(odd) {
      margin: auto;
    }
    &:nth-child(3n + 2) {
      --deg: -1.5deg;
    }
    &:nth-child(3n + 3) {
      --deg: 0deg;
    }
    &:nth-child(3n + 4) {
      --deg: 1.5deg;
    }
    &:nth-child(4n + 2) {
      margin-left: -1em;
    }
    &:nth-child(4n + 5) {
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
        font-size: 0.8em;
        font-family: var(--sans-font);
        color: rgba(0 0 0 / 0.75);
        text-wrap: pretty;
      }

      .date {
        color: rgba(0 0 0 / 0.75);
        font-family: var(--sans-font);
        font-size: 0.7em;
      }
    }
  }
</style>
