<script lang="ts">
  import { dev } from '$app/environment';
  import type { PostSummary } from '../../api/posts/util';

  export let post: PostSummary;
  $: ({ slug, metadata } = post);
  $: ({ tags } = metadata);

  async function showTagPrompt() {
    const promptTags = prompt('Edit tags', tags?.join(', '));
    if (typeof promptTags === 'string') {
      const filteredTags = promptTags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      const updatedTags = Array.from(new Set(filteredTags));
      await patchTags(updatedTags);
    }
  }

  async function patchTags(updatedTags: string[]) {
    const response = await fetch(`/api/posts/${slug}/tags`, {
      method: 'PATCH',
      body: JSON.stringify({ tags: updatedTags }),
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
  <button accesskey="t" on:click={showTagPrompt}>Edit tags</button>
{/if}
