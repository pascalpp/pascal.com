<script lang="ts" context="module">
	export interface Layer {
		cropped: boolean;
		crop: () => void;
		uncrop: () => void;
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let top = 0;
	let cropped = false;

	export function crop() {
		if (cropped) return;
		top = window.scrollY;
		cropped = true;
	}

	export function uncrop() {
		if (!cropped) return;
		cropped = false;
		requestAnimationFrame(() => window.scrollTo({ top }));
	}

	const layer = writable({ cropped, crop, uncrop });
	setContext('layer', layer);

	$: layer.update((previous) => ({ ...previous, cropped }));
</script>

<div class="layer" class:cropped>
	<div class="layer-content" style="top: -{top}px">
		<slot {cropped} {crop} {uncrop} />
	</div>
</div>

<style lang="less">
	.layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		box-sizing: border-box;
		display: contents;
		> .layer-content {
			display: contents;
		}

		&.cropped {
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			overflow: hidden;

			> .layer-content {
				display: block;
				box-sizing: border-box;
				position: absolute;
				left: 0;
				width: 100vw;
			}
		}
	}
</style>
