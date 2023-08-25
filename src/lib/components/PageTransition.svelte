<!-- https://dev.to/evanwinter/page-transitions-with-svelte-kit-35o6 -->
<!-- PageTransition.svelte -->
<script lang="ts">
	import { fly } from 'svelte/transition';
	export let url = '';
	export let distance: number;

	const duration = 250;
	const opacity = 0;
</script>

<div class="transition-container">
	{#key url}
		<div in:fly={{ x: distance, duration, opacity }} out:fly={{ x: -distance, duration, opacity }}>
			<slot />
		</div>
	{/key}
</div>

<style>
	.transition-container {
		width: 100%;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
	}

	.transition-container > * {
		grid-row: 1;
		grid-column: 1;
	}
</style>
