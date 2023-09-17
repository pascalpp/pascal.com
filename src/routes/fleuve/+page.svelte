<script lang="ts">
	import './PageCard.less';
	import PageCard from './PageCard.svelte';
	import { browser } from '$app/environment';
	import { pageStore, reset } from './store.js';
	import Changelog from './changelog.md';
	import { metadata } from './changelog.md';

	if (browser) (<any>window).pageStore = pageStore;

	let firstPageId: string;
	let showChangelog = false;

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
	<div class="pages">
		{#if browser && firstPageId}
			<PageCard pageId={firstPageId} />
		{/if}
	</div>
	<div class="tools">
		<button class="reset-button" on:click={onClickReset}>Start over</button>
		<button class="version" on:click={() => (showChangelog = !showChangelog)}>Version {metadata.latest}</button>
		<div class="changelog" class:show={showChangelog}>
			<div class="changelog-content">
				<Changelog />
			</div>
		</div>
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

	.tools {
		font-size: 13px;
		z-index: 1;
		position: fixed;
		bottom: 0px;
		left: 0px;
		padding: 12px;
		padding-right: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		pointer-events: none;
		gap: 2em;
	}

	.reset-button {
		cursor: pointer;
		pointer-events: all;
		color: gray;
		border-radius: 2em;
		padding: 8px 20px;
		border: 1px solid #ccc;
		user-select: none;
	}

	.version {
		position: relative;
		pointer-events: all;
		cursor: pointer;
		user-select: none;
	}

	.changelog {
		position: absolute;
		bottom: 100%;
		right: 20px;
		min-width: 400px;
		background-color: white;
		border-radius: 8px;
		border: 1px solid fade(black, 20%);
		transition: all 0.2s ease-in-out;
		box-shadow: 0 4p 4px 0 rgba(black, 0.1);
		max-height: 0;
		overflow: hidden;
		overflow-y: scroll;
		pointer-events: all;

		.changelog-content {
			height: fit-content;
			padding-bottom: 12px;
		}

		opacity: 0;
		&.show {
			max-height: 90vh;
			opacity: 1;
		}
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
