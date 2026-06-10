<script lang="ts">
  import { page } from '$app/stores';
  import type { PostMetadata } from '../../api/posts/util';
  import PostDiscussionLink from './PostDiscussionLink.svelte';
  import { giscusConfig } from './comments';

  export let slug: string;
  export let metadata: PostMetadata;
  export let archivedCommentsHtml: string | undefined = undefined;

  $: commentsEnabled = metadata.comments !== false;
  $: showLiveComments = commentsEnabled;
  $: giscusThemeUrl = `//${$page.url.host}/giscus-theme.css`;
</script>

{#if (commentsEnabled && (archivedCommentsHtml || showLiveComments)) || metadata.mastodon}
  <section class="full-width diary-comments" aria-labelledby="comments-heading">
    <h2 id="comments-heading">Comments</h2>

    {#if commentsEnabled && archivedCommentsHtml}
      <section class="diary-comments-archive" aria-labelledby="archived-comments-heading">
        <h3 id="archived-comments-heading">Archived comments</h3>
        <div class="archived-comment-content">
          {@html archivedCommentsHtml}
        </div>
      </section>
    {/if}

    {#if showLiveComments}
      <section class="live-comments breakout" aria-labelledby="live-comments-heading">
        <h3 id="live-comments-heading">Join the discussion</h3>
        <div class="giscus-container">
          {#key slug}
            <svelte:element
              this="script"
              src="https://giscus.app/client.js"
              data-repo={giscusConfig.repo}
              data-repo-id={giscusConfig.repoId}
              data-category={giscusConfig.category}
              data-category-id={giscusConfig.categoryId}
              data-mapping="specific"
              data-term={`/diary/${slug}`}
              data-strict="1"
              data-reactions-enabled="1"
              data-emit-metadata="0"
              data-input-position="bottom"
              data-theme={giscusThemeUrl}
              data-lang="en"
              data-loading="lazy"
              async
              crossorigin="anonymous"
            />
          {/key}
        </div>
      </section>
    {/if}

    <PostDiscussionLink {metadata} />
  </section>
{/if}

<style lang="less">
  .diary-comments {
    margin-block: 3rem 1.5rem;
    font-family: var(--sans-font);
    font-size: 15px;
    line-height: 1.5;

    h2,
    h3,
    p {
      margin: 0;
    }

    h2 {
      font-family: 'Crimson Pro', serif;
      font-size: 28px;
      font-weight: 500;
      line-height: 1.2;
    }

    h3 {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  }

  .diary-comments-archive,
  .live-comments {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-block: 1rem;
    border-top: 1px solid rgb(0 0 0 / 0.12);
  }

  .archived-comment-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-family: 'Crimson Pro', serif;
    font-size: 18px;
    line-height: 1.5;
  }

  .giscus-container {
    min-height: 160px;
  }
  :global(.diary-comments-archive .commentheader) {
    display: none;
  }

  :global(.diary-comments-archive .commentdivider) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.75rem;
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgb(0 0 0 / 0.1);
    font-family: var(--sans-font);
    font-size: 13px;
    line-height: 1.4;
  }

  :global(.diary-comments-archive .commentauthorbox) {
    font-weight: 600;
  }

  :global(.diary-comments-archive .commentdatebox),
  :global(.diary-comments-archive .commenttimebox) {
    color: rgb(0 0 0 / 0.58);
  }

  :global(.diary-comments-archive .commentbody) {
    white-space: pre-wrap;
  }
</style>
