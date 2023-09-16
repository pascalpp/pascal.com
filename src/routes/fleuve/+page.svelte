<script lang="ts">
	import PageCard from './PageCard.svelte';
	import { browser } from '$app/environment';
	import { pageStore } from './store.js';

	if (browser) (<any>window).pageStore = pageStore;
</script>

<main>
	<div class="pages">
		{#if browser}
			<PageCard pageId={$pageStore[0].id} />
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
