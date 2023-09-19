<script lang="ts">
	import { browser } from '$app/environment';
	import PageView from './PageView.svelte';
	import Slider from './Slider.svelte';
	import { pageStore, reset, addRootPage, loadTutorial } from './pages.store';
	import type { Page } from './pages.store';
	import { settings } from './settings.store';
	import ChangelogButton from './ChangelogButton.svelte';
	import { onMount } from 'svelte';
	import AspectRatio from './AspectRatio.svelte';
	import SettingsToolbar from './SettingsToolbar.svelte';

	let root: Page;
	let isShowingTutorial = false;
	$: aspectRatio = $settings.aspectRatioType === 'portrait' ? 0.85 : 1.2;

	function onClickReset() {
		if (confirm('Are you sure you want to start over?')) {
			reset();
			activateFirstPage();
		}
	}

	function onClickTutorial() {
		const tutorialStartPageId = loadTutorial();
		requestAnimationFrame(() => {
			const tutorialStartPage = document.querySelector(`[data-page-id="${tutorialStartPageId}"]`) as HTMLElement;
			tutorialStartPage?.click();
		});
	}

	function activateFirstPage() {
		const focusedPage = document.querySelector('.page-card.focus') as HTMLElement;
		const firstPage = document.querySelector('.page-card') as HTMLElement;
		if (focusedPage) {
			focusedPage?.focus();
		} else {
			firstPage?.click();
		}
	}

	onMount(() => {
		(<any>window).pageStore = pageStore;

		pageStore.subscribe((pages) => {
			(<any>window).pages = pages;

			root = pages.find((item) => item.id === 'root') as Page;
			if (!root) addRootPage();

			isShowingTutorial = root?.connections.some((pageId) => pageId === 'tutorial-start-page');
		});

		requestAnimationFrame(() => {
			activateFirstPage();
		});
	});
</script>

<svelte:head>
	<title>Fleuve</title>
	<meta name="description" content="A tool for visualizing and organizing your thoughts" />
	<meta property="og:title" content="Fleuve" />
	<meta property="og:description" content="A tool for visualizing and organizing your thoughts" />
	<meta property="og:url" content="https://www.pascal.com/fleuve" />
	<meta property="og:site_name" content="Fleuve" />
	<meta property="og:image" content="https://www.pascal.com/files/fleuve-og-preview.png" />
</svelte:head>

<main>
	<div
		class="pages"
		style:--child-opacity={$settings.childOpacity}
		style:--active-page-scale={$settings.activePageScale}
		style:--aspect-ratio={aspectRatio}
	>
		{#if browser && root}
			<PageView pageId="root" tabindex={1} />
		{/if}
	</div>

	{#if browser}
		<SettingsToolbar />
	{/if}

	<div class="tools row bottom left">
		<button class="reset-button" on:click={onClickReset}>Reset</button>
		{#if browser && !isShowingTutorial}
			<button class="tutorial-button" on:click={onClickTutorial}>Show Tutorial</button>
		{/if}
	</div>

	<ChangelogButton />
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
		min-width: 100%;
		min-height: 100%;
	}

	.tools {
		font-size: 13px;
		z-index: 1;
		position: fixed;
		padding: 12px;
		padding-right: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2em;

		opacity: 0.3;
		&:active,
		&:hover,
		&:focus-within {
			opacity: 1;
		}

		&.row {
			flex-direction: row;
		}
		&.column {
			flex-direction: column;
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

		a {
			color: black;
			text-decoration: none;
		}
	}

	button {
		cursor: pointer;
		user-select: none;
	}
</style>
