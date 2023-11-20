<script lang="ts">
  import { dev } from '$app/environment';
  import TagList from './TagList.svelte';
  import PostEditButtons from './PostEditButtons.svelte';
  import AddClipboardButtons from './AddClipboardButtons.svelte';
  import { page } from '$app/stores';
  import PostNavigation from './PostNavigation.svelte';

  export let data;

  $: ({ post, next, prev } = data);
  $: ({ title, date, content, slug, metadata } = post);
  $: ({ tags, status = 'published' } = metadata);

  const dateFormatter = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeFormatter = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  function formatDate(timestamp: string | number) {
    const date = new Date(timestamp);
    return dateFormatter.format(date) + ' · ' + timeFormatter.format(date).replace(' ', '').toLowerCase();
  }
</script>

<svelte:head>
  <title>Pascal’s Diary · {title}</title>
</svelte:head>

{#key $page.params.slug}
  <AddClipboardButtons />
{/key}

<!-- svelte-ignore a11y-accesskey -->
<header>
  <div class="post-header">
    <PostNavigation {next} {prev} top />

    <h1 class={status}>
      {title}
    </h1>
    <div class="subheader">
      <p class="date">
        {formatDate(date)}
      </p>
      <TagList {tags} />
    </div>
    {#if dev}
      <PostEditButtons {post} />
    {/if}
  </div>
</header>

<article>
  <svelte:component this={content} />
</article>

<footer>
  <PostNavigation {next} {prev} bottom />
</footer>

<style lang="less">
  header {
    margin-bottom: 1em;

    h1 {
      margin: 0;
      line-height: 1.1;
      font-size: 36px;
      font-weight: 500;

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
    }
  }

  article {
    flex-grow: 1;
    @media @not-mobile {
      min-height: 70vh;
    }
  }
    }
  }
</style>
