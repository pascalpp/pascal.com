<script lang="ts" context="module">
	import type { Writable } from 'svelte/store';
	import type { Page } from './pages.store';

	declare global {
		interface Window {
			pageStore: Writable<Page[]>;
			pages: Page[];
		}
		interface Document {
			lastActiveElement: HTMLElement | undefined;
		}
	}
</script>

<script lang="ts">
	import PageView from './PageView.svelte';
	import ChangelogButton from './ChangelogButton.svelte';
	import SettingsToolbar from './SettingsToolbar.svelte';
	import SettingsContext from './SettingsContext.svelte';
	import { pageStore, addRootPage } from './pages.store';
	import { onMount } from 'svelte';
	import { focusSelector } from './focusHelpers';
	import getKeySummary from './getKeySummary';

	let root: Page;

	function activateFirstPage() {
		const focusedActivePage = '.page-card.focus.active';
		const focusedPage = '.page-card.focus';
		const firstPage = '.page-card';
		const card = focusSelector(focusedActivePage) || focusSelector(focusedPage) || focusSelector(firstPage);
		card?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}

	function onFocusOut(event: FocusEvent) {
		var target = event.target as HTMLElement;
		document.lastActiveElement = target;
	}

	function onKeyDown(event: KeyboardEvent) {
		const summary = getKeySummary(event);
		if (!summary) return;

		console.log(summary);
		if (summary === 'Cmd K') {
			const settingsButton = document.getElementById('settings-button');
			settingsButton?.click();
		}
	}

	onMount(() => {
		window.pageStore = pageStore;

		pageStore.subscribe((pages) => {
			window.pages = pages;

			root = pages.find((item) => item.id === 'root') as Page;
			if (!root) {
				addRootPage();
			}
		});

		requestAnimationFrame(() => {
			activateFirstPage();
		});

		document.body.addEventListener('keydown', onKeyDown);
		document.body.addEventListener('focusout', onFocusOut);
		return () => {
			document.body.removeEventListener('keydown', onKeyDown);
			document.body.removeEventListener('focusout', onFocusOut);
		};
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
		<SettingsToolbar />
		<ChangelogButton />

		<div class="pages">
			{#if root}
				<PageView pageId="root" tabindex={1} />
			{/if}
		</div>
	</main>
</SettingsContext>

<style lang="less">
	.pages {
		width: max-content;
		padding: 10vw;
		box-sizing: border-box;
		isolation: isolate;
		@media screen and (max-width: 800px) {
			padding: 5vw;
			padding-top: 20vw;
			padding-bottom: 20vw;
		}
	}
</style>
