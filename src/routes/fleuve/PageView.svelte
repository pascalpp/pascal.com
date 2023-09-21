<script lang="ts">
	import PageCard from './PageCard.svelte';
	import PageConnections from './PageConnections.svelte';
	import type { Page, PageId } from './pages.store';
	import { pageStore } from './pages.store';

	export let pageId: PageId;
	export let grandparentId: PageId | undefined = undefined;
	export let parentId: PageId | undefined = undefined;
	export let previousSiblingId: PageId | undefined = undefined;
	export let nextSiblingId: PageId | undefined = undefined;
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
				<PageCard {page} {tabindex} {parentId} {previousSiblingId} {nextSiblingId} />
			{/if}
			<PageConnections {page} {tabindex} {parentId} />
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

		// &.nested {
		// 	.card-container {
		// 		margin-left: 24px;
		// 		position: relative;
		// 		&::before {
		// 			position: absolute;
		// 			// display: block;
		// 			content: '';
		// 			height: 1px;
		// 			width: 24px;
		// 			transition: width 0.2s ease-in-out;
		// 			background-color: black;
		// 			top: 25px;
		// 			right: 100%;
		// 		}
		// 	}
		// }
	}
</style>
