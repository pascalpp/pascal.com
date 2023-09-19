<script lang="ts">
	import PageCard from './PageCard.svelte';
	import PageConnections from './PageConnections.svelte';
	import type { Page, PageId } from './pages.store';
	import { pageStore } from './pages.store';
	import { settings } from './settings.store';

	export let pageId: PageId;
	export let parentId: PageId | undefined = undefined;
	export let tabindex = 1;

	let page: Page;
	$: opacity = $settings.childOpacity;

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
			{#if page.active || opacity > 0}
				<PageConnections {page} tabindex={tabindex + 1} />
			{/if}
		</div>
	{/if}
{/key}

<style lang="less">
	.page {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		position: relative;
	}
</style>
