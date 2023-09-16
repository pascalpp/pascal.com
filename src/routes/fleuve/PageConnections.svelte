<script lang="ts">
	import type { PageId } from './Page.model';
	import PageCard from './PageCard.svelte';

	export let pageId: PageId;
	export let connections: PageId[];
	export let onAddPage: (event: KeyboardEvent) => void;
	export let tabindex: number;
</script>

<div class="connections">
	{#each connections as connectionId (connectionId)}
		<PageCard pageId={connectionId} {tabindex} parentPageId={pageId} />
	{/each}
	<div {tabindex} autofocus={true} contenteditable="true" class="add-connection" on:keydown={onAddPage} />
</div>
