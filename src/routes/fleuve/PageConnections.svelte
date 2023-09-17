<script lang="ts">
	import AddPageCard from './AddPageCard.svelte';
	import type { Page } from './Page.model';
	import PageCard from './PageCard.svelte';

	export let page: Page;
	export let tabindex: number;
</script>

<div class="connections">
	{#each page.connections as connectionId (connectionId)}
		<PageCard pageId={connectionId} {tabindex} />
	{/each}
	<AddPageCard {page} {tabindex} />
</div>
