<script lang="ts">
	export let top = false;
	export let bottom = false;
	export let left = false;
	export let right = false;
	export let show = false;

	let toolbar: HTMLDivElement;

	function toggle() {
		show = !show;
		if (show) {
			document.body.addEventListener('click', onClickOutside);
		} else {
			document.body.removeEventListener('click', onClickOutside);
		}
	}

	function onClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!toolbar.contains(target)) {
			show = false;
		}
	}

	function onClick(event: MouseEvent) {
		if (!show) event.stopPropagation();
	}
</script>

<div class="toolbar" class:top class:bottom class:left class:right class:show on:click={onClick} bind:this={toolbar}>
	<slot>
		<slot name="button" {show} {toggle} />
		<div class="toolbar-panel">
			<slot name="panel" {toggle} />
		</div>
	</slot>
</div>

<style lang="less">
	.toolbar {
		margin: 16px;
		font-size: 13px;
		z-index: 1;
		position: fixed;
		opacity: 0.3;
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
