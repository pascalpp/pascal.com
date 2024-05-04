<script lang="ts">
  import type { PostMetadata } from '../../api/posts/util';
  import { LogoMastodon } from '@iconslib/svelte/ionicons';

  export let metadata: PostMetadata;
  let { mastodon } = metadata;
</script>

{#if mastodon}
  <div class="post-discussion">
    <a href={mastodon} rel="noopener noreferrer">
      <LogoMastodon width="1em" fill="currentColor" />
      Discuss this post on Mastodon
    </a>
  </div>
{/if}

<style lang="less">
  .post-discussion {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5em;
      text-decoration: none;
    }
  }
</style>
