<script lang="ts" context="module">
	let hideCurrentToast: (() => void) | undefined;

	export interface ToastOptions {
		error?: boolean;
	}
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import Column from '$lib/components/Column.svelte';
	import { onDestroy } from 'svelte';

	export let duration = 4000;

	const transitionDuration = 250;
	const distance = 100;

	let element: HTMLDivElement | undefined;
	let isOpen = false;
	let error: boolean | undefined = undefined;
	let timer: number | undefined = undefined;

	export function show(options: ToastOptions = {}) {
		if (hideCurrentToast) hideCurrentToast();
		error = options.error;
		isOpen = true;
		hideCurrentToast = hide;
		timer = window.setTimeout(hide, duration);
	}

	export function hide() {
		if (!isOpen) return;
		window.clearTimeout(timer);
		isOpen = false;
		element = undefined;
		if (hideCurrentToast === hide) hideCurrentToast = undefined;
	}

	$: if (element && isOpen) {
		document.body.appendChild(element);
	}

	onDestroy(() => {
		hide();
	});

	let windowHeight: number;
</script>

<svelte:window bind:innerHeight={windowHeight} />

{#if isOpen}
	<div class="toast" bind:this={element}>
		{#key timer}
			<div
				class="toast-banner"
				class:error
				in:fly={{ y: -windowHeight / 2, duration: transitionDuration }}
				out:fly={{ y: distance, duration: transitionDuration * 2 }}
			>
				<Column>
					<slot {show} {hide} />
				</Column>
			</div>
		{/key}
	</div>
{/if}

<style lang="less">
	.toast {
		outline: none;
		position: fixed;
		z-index: 1;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 0px;
		overflow: visible;
		box-sizing: border-box;
		overscroll-behavior: contain;

		.toast-banner {
			margin-bottom: 20px;
			background-color: tint(steelblue, 95%);
			border: 1px solid fade(steelblue, 40%);
			padding: 20px;
			border-radius: 6px;
			box-shadow: 0px 5px 10px fade(black, 10%);
			max-width: 400px;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			font-size: 16px;

			&.error {
				background-color: tint(maroon, 95%);
				border: 1px solid fade(maroon, 40%);
			}
		}
	}
</style>
