<script lang="ts">
  import { dev } from '$app/environment';
  import type { PostSummary } from '../../api/posts/util';

  export let post: PostSummary;

  $: ({ slug } = post);

  async function editPost() {
    if (!dev) return;

    const response = await fetch(`/api/posts/${slug}/edit`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    });

    if (!response.ok) {
      throw new Error('Invalid response');
    }
  }
</script>

<!-- svelte-ignore a11y-accesskey -->
{#if dev}
  <button accesskey="e" type="button" on:click={editPost}>Edit post</button>
{/if}
