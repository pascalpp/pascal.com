<script lang="ts">
  import { dev } from '$app/environment';
  import type { PostSummary } from '../../api/posts/util';

  export let post: PostSummary;
  $: ({ slug, metadata } = post);
  $: ({ status = 'published' } = metadata);

  async function toggleStatus() {
    const response = await fetch(`/api/posts/${slug}/status`, {
      method: 'PATCH',
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
  <button accesskey="s" on:click={toggleStatus}>Status: {status}</button>
{/if}
