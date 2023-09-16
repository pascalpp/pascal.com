<script lang="ts">
	import PageCard from './PageCard.svelte';
	import { browser } from '$app/environment';
	import { pageStore, reset } from './store.js';

	if (browser) (<any>window).pageStore = pageStore;

	let firstPageId: string;

	function onClickReset() {
		if (confirm('Are you sure you want to start over?')) {
			reset();
			window.location.reload();
		}
	}

	pageStore.subscribe((pages) => {
		firstPageId = pages[0].id;
	});
</script>

<main>
	<div class="pages">
		{#if browser && firstPageId}
			<PageCard pageId={firstPageId} parentPageId={null} />
		{/if}
	</div>
	<button class="reset-button" on:click={onClickReset}>Start over</button>
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
