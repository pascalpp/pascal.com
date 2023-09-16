<script lang="ts">
	import type { PageId } from './Page.model';
	import PageCard from './PageCard.svelte';

	export let connections: PageId[];
	export let onAddPage: (event: KeyboardEvent) => void;
</script>

<div class="connections">
	{#each connections as connectionId}
		<PageCard pageId={connectionId} />
	{/each}
	<div autofocus={true} contenteditable="true" class="add-connection" on:keydown={onAddPage} />
</div>
