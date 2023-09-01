<script lang="ts">
	import { dev } from '$app/environment';
	import Tag from '../Tag.svelte';
	import TagEditor from './TagEditor.svelte';

	export let tags: string[] = [];
	export let slug: string;
</script>

{#if tags?.length || dev}
	<p class="tags">
		{#if tags?.length}
			{#each tags as tag}
				<Tag {tag} />
			{/each}
		{/if}
		{#if dev}
			<TagEditor {tags} {slug} />
		{/if}
	</p>
{/if}

<style lang="less">
	.tags {
		font-size: 14px;
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}
</style>
