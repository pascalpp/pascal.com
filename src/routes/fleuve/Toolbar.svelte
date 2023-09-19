<script lang="ts">
	export let top = false;
	export let bottom = false;
	export let left = false;
	export let right = false;
	export let column = false;
	export let row = false;
	export let show = false;

	function toggle() {
		show = !show;
		if (show) {
			document.body.addEventListener('click', toggle);
		} else {
			document.body.removeEventListener('click', toggle);
		}
	}

	function onClick(event: MouseEvent) {
		event.stopPropagation();
	}
</script>

<div class="toolbar" class:top class:bottom class:left class:right class:show on:click={onClick}>
	<slot name="button" {show} {toggle} />
	<div class="toolbar-panel">
		<div class="toolbar-content" class:row class:column>
			<slot name="panel" {toggle} />
		</div>
	</div>
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
		&.show {
			opacity: 1;
		}

		&.top {
			top: 0px;
		}
		&.left {
			left: 0px;
		}
		&.right {
			right: 0px;
		}
		&.bottom {
			bottom: 0px;
		}

		:global(a) {
			color: black;
			text-decoration: none;
		}
		:global(button) {
			cursor: pointer;
			user-select: none;
		}

		.toolbar-panel {
			position: absolute;
			max-height: 0;
			overflow: hidden;
			overflow-y: scroll;
		}

		&.right {
			.toolbar-panel {
				right: 0;
			}
		}
		&.top {
			.toolbar-panel {
				top: 100%;
				margin-top: 12px;
			}
		}

		&.show .toolbar-panel {
			max-height: 80vh;
			box-shadow: 0 4px 4px 0 fade(black, 10%);
		}

		.toolbar-content {
			padding: 16px;
			border: 1px solid black;
			background-color: fade(white, 80%);
			border-radius: 4px;

			display: flex;
			justify-content: center;
			align-items: stretch;
			gap: 24px;

			&.row {
				flex-direction: row;
			}
			&.column {
				flex-direction: column;
			}
		}
	}
</style>
