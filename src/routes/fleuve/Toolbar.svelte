<script lang="ts">
	import { createFocusTrap } from 'focus-trap';
	import type { FocusTrap } from 'focus-trap';
	import { onMount } from 'svelte';

	export let top = false;
	export let bottom = false;
	export let left = false;
	export let right = false;
	export let show = false;
	export let tabindex = 1;
	export let trapFocus = true;

	let toolbar: HTMLDivElement;
	let trap: FocusTrap | undefined;

	$: if (show && trapFocus) {
		trap = createFocusTrap(toolbar, {
			escapeDeactivates: true,
			clickOutsideDeactivates: true,
		});
		trap.activate();
	} else {
		trap?.deactivate({ returnFocus: true });
		trap = undefined;
	}

	function toggle() {
		show = !show;
		if (show) {
			document.body.addEventListener('click', onClickOutside);
			document.body.addEventListener('keydown', onKeyDown);
		} else {
			document.body.removeEventListener('click', onClickOutside);
			document.body.removeEventListener('keydown', onKeyDown);
		}
	}

	function onClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!toolbar.contains(target)) {
			show = false;
		}
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.stopPropagation();
			show = false;
		}
	}

	function onClick(event: MouseEvent) {
		if (!show) event.stopPropagation();
	}

	onMount(() => {
		return () => {
			document.body.removeEventListener('click', onClickOutside);
			document.body.removeEventListener('keydown', onKeyDown);
		};
	});
</script>

<div class="toolbar" class:top class:bottom class:left class:right class:show on:click={onClick} bind:this={toolbar}>
	<slot>
		<slot name="button" {show} {toggle} {tabindex} />
		<div class="toolbar-panel">
			<slot name="panel" {toggle} tabindex={show ? tabindex : -1} />
		</div>
	</slot>
</div>

<style lang="less">
	.toolbar {
		position: fixed;
		margin: 16px;
		font-size: 13px;
		z-index: 1;
		isolation: isolate;
		opacity: 0.3;
		outline: none;
		&:hover,
		&:active,
		&:focus-within,
		&.show {
			opacity: 1;
		}

		.toolbar-panel {
			position: absolute;
			overflow: hidden;
			overflow-y: scroll;
			border: 1px solid black;
			border-radius: 4px;
			background-color: white;
			box-shadow: 0 4px 4px 0 fade(black, 10%);
			opacity: 0;
			max-height: 0;
			pointer-events: none;
			transition: all 0.2s ease-in-out;
		}

		&.show .toolbar-panel {
			opacity: 1;
			max-height: 80vh;
			pointer-events: auto;
		}

		&.top {
			top: 0px;
			.toolbar-panel {
				top: 100%;
				margin-top: 8px;
			}
		}
		&.left {
			left: 0px;
		}
		&.right {
			right: 0px;
			.toolbar-panel {
				right: -8px;
			}
		}
		&.bottom {
			bottom: 0px;
			.toolbar-panel {
				bottom: 100%;
				margin-bottom: 12px;
			}
		}

		:global(a) {
			color: black;
			text-decoration: none;
		}
		:global(button) {
			cursor: pointer;
			user-select: none;
		}
	}
</style>
