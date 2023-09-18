<script lang="ts">
	import AddPageCard from './AddPageCard.svelte';
	import type { Page } from './pages.store';
	import PageView from './PageView.svelte';

	export let page: Page;
	export let tabindex: number;
</script>

<div class="connections" class:active={page.active}>
	{#each page.connections as connectionId, index (connectionId)}
		<PageView pageId={connectionId} tabindex={tabindex * 10 + index} />
	{/each}
	<AddPageCard {page} tabindex={tabindex * 10 + page.connections.length} />
</div>

<style lang="less">
	.connections {
		transform: translateX(-2px);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1em;

		opacity: var(--child-opacity, 0.5);
		&.active {
			opacity: 1;
		}

		// set placeholder text for the add page card
		--add-placeholder: 'Add card';
		&:has(.page.active) {
			--add-placeholder: 'Add sibilng';
		}

		// show left border on connections block if there are multiple items in it
		&.active:has(:first-child:not(:last-child)),
		&:has(.page + .page) {
			margin-left: 24px;
			border-left: 1px solid black;
			&::before {
				position: absolute;
				display: block;
				content: '';
				height: 1px;
				width: 24px;
				background-color: black;
				top: 50%;
				right: 100%;
			}
		}

		// show connection line on left side of each child
		:global(> *) {
			margin-left: 24px;
			&::before {
				position: absolute;
				display: block;
				content: '';
				height: 1px;
				width: 24px;
				background-color: black;
				top: 50%;
				right: 100%;
			}
		}
		:global(> .page.active) {
			margin-left: 16px;
			&::before {
				width: 16px;
			}
		}

		//  hide siblings idea
		// .connections:has(.page.active) {
		// 	> .page:not(.active) {
		// 		display: none;
		// 	}
		// 	> .add-connection {
		// 		display: none;
		// 	}
		// }
	}
</style>
