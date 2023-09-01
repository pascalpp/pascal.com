<script lang="ts">
	import { dev } from '$app/environment';
	import Tag from '../Tag.svelte';
	import Button from '$lib/components/Button.svelte';

	export let tags: string[] = [];
	export let slug: string;

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

{#if dev}
	<Button accesskey="e" label="Edit tags" on:click={showTagPrompt}><Tag tag="edit tags" link={false} /></Button>
{/if}
