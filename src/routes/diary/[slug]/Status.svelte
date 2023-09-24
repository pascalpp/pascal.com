<script lang="ts">
  import { dev } from '$app/environment';
  import Tag from '../Tag.svelte';
  import Button from '$lib/components/Button.svelte';

  export let status: 'draft' | 'published';
  export let slug: string;

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

{#if dev}
  <Button accesskey="s" label="Edit tags" on:click={toggleStatus}><Tag tag={status} link={false} /></Button>
{/if}
