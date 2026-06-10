<script lang="ts">
  import { dev } from '$app/environment';
  import { page } from '$app/stores';
  import AddClipboardButtons from './AddClipboardButtons.svelte';
  import DiaryComments from './DiaryComments.svelte';
  import PostEditButtons from './PostEditButtons.svelte';
  import PostNavigation from './PostNavigation.svelte';
  import TagList from './TagList.svelte';
  import { imageVersion } from '../preview/_layout';

  export let data;

  $: ({ post, next, prev } = data);
  $: ({ title, metadata, PostComponent } = post);
  $: ({ tags, status = 'published', date, updated, summary } = metadata);
  $: postUrl = `${$page.url.origin}/diary/${$page.params.slug}`;
  $: previewImageUrl = `${$page.url.origin}/diary/preview/${$page.params.slug}?v=${imageVersion}`;

  const dateFormatter = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
</script>

<svelte:head>
  <title>Pascal’s Diary · {title}</title>
  {#if summary}
    <meta name="description" content={summary} />
    <meta property="og:description" content={summary} />
  {/if}
  <meta property="og:title" content={title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={postUrl} />
  <meta property="og:image" content={previewImageUrl} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{#key $page.params.slug}
  <AddClipboardButtons />

  <header class="full-width">
    <div class="post-header">
      <PostNavigation {next} {prev} top />

      <h1 class={status}>
        {title}
      </h1>
      <div class="subheader">
        <p class="published-date">
          {dateFormatter.format(new Date(date))}
        </p>
        {#if updated}
          <p class="updated-date">Updated {dateFormatter.format(new Date(updated))}</p>
        {/if}
        <TagList {tags} />
      </div>
      {#if dev}
        <PostEditButtons {post} />
      {/if}
    </div>
  </header>

  <article class="full-width">
    {#key $page.params.slug}
      <PostComponent />
    {/key}
  </article>

  <footer class="full-width">
    <DiaryComments slug={$page.params.slug} {metadata} archivedCommentsHtml={post.archivedCommentsHtml} />
    <PostNavigation {next} {prev} bottom />
  </footer>
{/key}

<style lang="less">
  header {
    margin-bottom: 1em;

    h1 {
      margin: 0;
      line-height: 1.2;
      font-size: 32px;
      font-weight: 500;
      text-wrap: balance;

      &.draft {
        color: darkred;
        &::before {
          content: '[draft]';
          display: block;
          font-family: var(--sans-font);
          text-transform: uppercase;
          letter-spacing: 3px;
          font-size: 12px;
        }
      }
    }

    .subheader {
      font-family: var(--sans-font);
      font-size: 16px;
      border-bottom: 1px solid rgb(0 0 0 / 0.1);
      margin: 0.5em 0;
      margin-left: -0.75em;
      padding: 0.75em;
      padding-right: 3em;
      padding-top: 0;
      width: max-content;
      display: flex;
      flex-direction: column;
      gap: 0.1em;

      p {
        margin: 0;
      }
    }
  }

  article {
    flex-grow: 1;
  }
</style>
