<script lang="ts">
	import { browser } from '$app/environment';
	import PageView from './PageView.svelte';
	import ChangelogButton from './ChangelogButton.svelte';
	import SettingsToolbar from './SettingsToolbar.svelte';
	import SettingsContext from './SettingsContext.svelte';
	import { pageStore, addRootPage } from './pages.store';
	import type { Page } from './pages.store';
	import { onMount } from 'svelte';

	let root: Page;

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
			if (!root) {
				addRootPage();
			}
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

<SettingsContext>
	<main>
		<div class="pages">
			{#if browser && root}
				<PageView pageId="root" tabindex={1} />
			{/if}
		</div>

		<SettingsToolbar />
		<ChangelogButton />
	</main>
</SettingsContext>

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
</style>
