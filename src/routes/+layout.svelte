<script lang="ts">
	import '../app.less';

	import Layer from '$lib/components/Layer.svelte';
	import Toaster from '$lib/components/Toaster.svelte';
	import { fade } from 'svelte/transition';

	export let data;

	console.log({ data });
</script>

<Layer>
	<Toaster>
		<div class="transition-container">
			{#key data.currentRoute.split('/')[1]}
				<main in:fade={{ duration: 250, delay: 150 }} out:fade={{ duration: 250 }}>
					<slot />
				</main>
			{/key}
		</div>
	</Toaster>
</Layer>

<style lang="less">
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
