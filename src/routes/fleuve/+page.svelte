<script lang="ts">
	import PageCard from './PageCard.svelte';
	import { browser } from '$app/environment';
</script>

<main>
	<div class="pages">
		{#if browser}
			<PageCard />
		{/if}
	</div>
</main>

<style lang="less">
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.pages {
		padding: 2vw;
		display: flex;
		overflow-x: scroll;
		box-sizing: border-box;
		flex-shrink: 0;
	}
</style>
