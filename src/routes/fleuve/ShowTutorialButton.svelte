<script lang="ts">
	import { pageStore, loadTutorial } from './pages.store';
	import { onMount } from 'svelte';

	let isShowingTutorial = false;

	function onClickTutorial() {
		const tutorialStartPageId = loadTutorial();
		requestAnimationFrame(() => {
			const tutorialStartPage = document.querySelector(`[data-page-id="${tutorialStartPageId}"]`) as HTMLElement;
			tutorialStartPage?.click();
		});
	}

	onMount(() => {
		pageStore.subscribe((pages) => {
			const root = pages.find((item) => item.id === 'root');
			isShowingTutorial = !!root?.connections.some((pageId) => pageId === 'tutorial-start-page');
		});
	});
</script>

{#if !isShowingTutorial}
	<p>
		<button type="button" class="tutorial-button" on:click={onClickTutorial}>Show Tutorial</button>
	</p>
{/if}
