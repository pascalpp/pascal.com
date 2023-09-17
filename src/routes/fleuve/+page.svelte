<script lang="ts">
	import PageCard from './PageCard.svelte';
	import { browser } from '$app/environment';
	import { pageStore, reset } from './store.js';

	if (browser) (<any>window).pageStore = pageStore;

	let firstPageId: string;

	function onClickReset() {
		if (confirm('Are you sure you want to start over?')) {
			reset();
			// TODO: why isn't the page refreshing when we reset the store?
			window.location.reload();
		}
	}

	pageStore.subscribe((pages) => {
		firstPageId = pages[0].id;
	});
</script>

<main>
	<button class="reset-button" on:click={onClickReset}>Start over</button>
	<div class="pages">
		{#if browser && firstPageId}
			<PageCard pageId={firstPageId} />
		{/if}
	</div>
</main>

<style lang="less">
	main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: scroll;
	}

	.reset-button {
		position: fixed;
		bottom: 20px;
		left: 20px;
		cursor: pointer;
		color: gray;
		font-size: 14px;
		border-radius: 2em;
		padding: 8px 20px;
		border: 1px solid #ccc;
		z-index: 1;
	}

	.pages {
		position: absolute;
		top: 0;
		left: 0;
		flex: 1;
		padding: 10vw;
		display: flex;
		box-sizing: border-box;
		flex-shrink: 0;
	}
</style>
