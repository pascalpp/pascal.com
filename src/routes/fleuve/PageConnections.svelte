<script lang="ts">
	import type { Page } from './Page.model';
	import PageCard from './PageCard.svelte';

	export let page: Page;
	export let onAddPage: (event: KeyboardEvent) => void;
	export let tabindex: number;
</script>

<div class="connections">
	{#each page.connections as connectionId (connectionId)}
		<PageCard pageId={connectionId} {tabindex} parentPageId={page.id} />
	{/each}
	<div {tabindex} autofocus={true} contenteditable="true" class="add-connection" on:keydown={onAddPage} />
</div>
