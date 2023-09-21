<script lang="ts">
	import PageCard from './PageCard.svelte';
	import PageConnections from './PageConnections.svelte';
	import type { Page, PageId } from './pages.store';
	import { pageStore } from './pages.store';

	export let pageId: PageId;
	export let parentId: PageId | undefined = undefined;
	export let tabindex = 1;

	let page: Page;

	pageStore.subscribe((pages) => {
		page = pages.find((p) => p.id === pageId) as Page;
	});
</script>

{#key page?.id}
	{#if page}
		<div class="page" class:active={page.active}>
			{#if parentId}
				<PageCard {page} {tabindex} {parentId} />
			{/if}
			<PageConnections {page} {tabindex} />
		</div>
	{/if}
{/key}

<style lang="less">
	.page {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		position: relative;
		pointer-events: none;
	}
</style>
