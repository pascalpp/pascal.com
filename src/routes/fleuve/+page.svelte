<script lang="ts">
	import './PageCard.less';
	import { browser } from '$app/environment';
	import PageCard from './PageCard.svelte';
	import Slider from './Slider.svelte';
	import { pageStore, reset } from './store.js';
	import Changelog from './changelog.md';
	import { metadata } from './changelog.md';

	if (browser) (<any>window).pageStore = pageStore;

	let firstPageId: string;
	let showChangelog = false;
	let childOpacity = 0.5;
	let activePageScale = 0.5;

	function scale(number: number, inMin: number, inMax: number, outMin: number, outMax: number) {
		return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
	}

	function onClickReset() {
		if (confirm('Are you sure you want to start over with an empty document?')) {
			reset();
		}
	}

	function toggleChangelog() {
		showChangelog = !showChangelog;
		requestAnimationFrame(() => {
			if (showChangelog) {
				document.body.addEventListener('click', toggleChangelog);
			} else {
				document.body.removeEventListener('click', toggleChangelog);
			}
		});
	}

	pageStore.subscribe((pages) => {
		firstPageId = pages[0].id;
	});
</script>

<main>
	<div
		class="pages"
		style="--child-opacity: {childOpacity}; --active-page-scale: {scale(activePageScale, 0, 1, 0.3, 1)}"
	>
		{#if browser && firstPageId}
			{#key firstPageId}
				<PageCard pageId={firstPageId} />
			{/key}
		{/if}
	</div>
	<div class="tools top right">
		<Slider
			id="active-page-scale"
			label="Scale"
			bind:value={activePageScale}
			title="Change the scale of active pages"
		/>
		<Slider
			id="child-opacity"
			label="Opacity"
			bind:value={childOpacity}
			title="Change the opacity for childen of the active page"
		/>
	</div>
	<div class="tools bottom left">
		<button class="reset-button" on:click={onClickReset}>Reset</button>
	</div>
	<div class="tools bottom right">
		<button class="version" on:click={toggleChangelog}>Version {metadata.latest}</button>
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
		padding: 12px;
		padding-right: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 2em;
		opacity: 0.3;
		&:active,
		&:hover,
		&:focus-within,
		&:has(.changelog.show) {
			opacity: 1;
		}

		&.top {
			top: 0px;
		}
		&.left {
			left: 0px;
		}
		&.right {
			right: 0px;
		}
		&.bottom {
			bottom: 0px;
		}
	}

	button {
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
