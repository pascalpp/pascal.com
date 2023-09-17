<script lang="ts">
	import './PageCard.less';
	import PageCard from './PageCard.svelte';
	import { browser } from '$app/environment';
	import { pageStore, reset } from './store.js';
	import Changelog from './changelog.md';
	import { metadata } from './changelog.md';
	import Column from '$lib/components/Column.svelte';

	if (browser) (<any>window).pageStore = pageStore;

	let firstPageId: string;
	let showChangelog = false;
	let childOpacity = 0.5;

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
	<div class="pages" style="--child-opacity: {childOpacity}">
		{#if browser && firstPageId}
			<PageCard pageId={firstPageId} />
		{/if}
	</div>
	<div class="tools left">
		<button class="reset-button" on:click={onClickReset}>Start over</button>
		<Column center gap="4px">
			<label for="child-opacity">Opacity {childOpacity.toFixed(1)}</label>
			<input id="child-opacity" type="range" min="0" max="1" step="0.1" bind:value={childOpacity} />
		</Column>
	</div>
	<div class="tools right">
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
		overflow: scroll;
	}

	.pages {
		position: absolute;
		top: 0;
		left: 0;
		padding: 10vw;
		box-sizing: border-box;
	}

	.tools {
		font-size: 13px;
		z-index: 1;
		position: fixed;
		bottom: 0px;
		padding: 12px;
		padding-right: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 2em;
		opacity: 0.3;
		&:hover,
		&:focus-within {
			opacity: 1;
		}

		&.left {
			left: 0px;
		}
		&.right {
			right: 0px;
		}
	}

	.reset-button {
		cursor: pointer;
		border-radius: 2em;
		padding: 8px 20px;
		border: 1px solid black;
		user-select: none;
	}

	.version {
		position: relative;
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
</style>
