<script lang="ts">
  import { dev } from '$app/environment';
  import { page } from '$app/stores';
  import AddClipboardButtons from './AddClipboardButtons.svelte';
  import PostEditButtons from './PostEditButtons.svelte';
  import PostNavigation from './PostNavigation.svelte';
  import TagList from './TagList.svelte';

  export let data;

  $: ({ post, next, prev } = data);
  $: ({ title, content, metadata } = post);
  $: ({ tags, status = 'published', date, updated } = metadata);

  const dateFormatter = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
</script>

<svelte:head>
  <title>Pascal’s Diary · {title}</title>
</svelte:head>

{#key $page.params.slug}
  <AddClipboardButtons />
{/key}

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
  <svelte:component this={content} />
</article>

<footer class="full-width">
  <PostNavigation {next} {prev} bottom />
</footer>

<style lang="less">
  header {
    margin-bottom: 1em;

    h1 {
      margin: 0;
      line-height: 1.2;
      font-size: 30px;
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
