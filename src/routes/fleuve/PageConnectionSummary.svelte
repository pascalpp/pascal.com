<script lang="ts">
	import { pageStore, type Page, getAllChildPages, activatePage } from './pages.store';

	export let page: Page;
	export let tabindex: number;

	let childCount = 0;

	pageStore.subscribe((pages) => {
		childCount = getAllChildPages(pages, page.id).length;
	});

	function onClick() {
		activatePage(page.id);
	}
</script>

{#if childCount > 0}
	<button type="button" class="connection-summary" class:active={page.active} on:click={onClick} {tabindex}>
		<div class="count-card">
			+{childCount} more
		</div>
	</button>
{/if}

<style lang="less">
	.connection-summary {
		pointer-events: all;
		outline: none;

		.count-card {
			display: block;
			cursor: pointer;
			background-color: white;
			box-sizing: border-box;
			border: 1px solid fade(black, 30%);
			padding: 0px 8px;
			font-size: 12px;
			line-height: 2em;
			border-radius: 4px;
			transform: translateY(8.5px);
			width: auto;
			white-space: nowrap;
			opacity: 0.5;
			&:hover {
				opacity: 1;
			}
		}

		&:focus,
		&:active {
			.count-card {
				opacity: 1;
				outline-style: solid;
				outline-width: 1px;
				outline-color: black;
			}
		}
	}
</style>
