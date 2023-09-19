<script lang="ts">
	import AddPageCard from './AddPageCard.svelte';
	import type { Page } from './pages.store';
	import PageView from './PageView.svelte';

	export let page: Page;
	export let tabindex: number;
</script>

<div class="connections" class:active={page.active}>
	{#each page.connections as connectionId, index (connectionId)}
		<PageView pageId={connectionId} tabindex={tabindex * 10 + index} parentId={page.id} />
	{/each}
	{#if page.active}
		<AddPageCard {page} tabindex={tabindex * 10 + page.connections.length} />
	{/if}
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

		// conditional placeholder vars
		// root-level
		--title-placeholder: 'Untitled flow';
		--add-card-placeholder: 'Add new flow';
		&:not(:first-child) {
			// child-level with no active siblings
			--title-placeholder: 'Untitled card';
			--add-card-placeholder: 'Add card';
			&:has(.page.active) {
				// child-level with active siblings
				--add-card-placeholder: 'Add sibilng';
			}
		}

		// show left border on connections block if there are multiple items in it
		&:not(:first-child) {
			&.active:has(:first-child:not(:last-child)),
			&:has(.page + .page) {
				margin-left: 24px;
				&::before {
					position: absolute;
					display: block;
					content: '';
					height: 1px;
					width: 24px;
					background-color: black;
					top: 21px;
					right: 100%;
					// opacity: 0.3;
				}
				&::after {
					position: absolute;
					display: block;
					content: '';
					height: calc(100% - 38px);
					width: 24px;
					border-left: 1px solid black;
					border-bottom: 1px solid black;
					border-bottom-left-radius: 4px;
					top: 21px;
					right: calc(100% - 24px);
					// opacity: 0.3;
				}
				// idea for darker lines leading to active cards
				// &:has(.page.active) {
				// 	&::before {
				// 		opacity: 1;
				// 	}
				// 	&::after {
				// 		opacity: 1;
				// 	}
				// }
			}

			// show connection line on left side of each child
			:global(> *) {
				margin-left: 24px;
				transition: margin-left 0.2s ease-in-out;
				position: relative;
				&::before {
					position: absolute;
					display: block;
					content: '';
					height: 1px;
					width: 24px;
					transition: width 0.2s ease-in-out;
					background-color: black;
					top: 21px;
					right: 100%;
					// opacity: 0.3;
				}
			}
			:global(> .page.active) {
				margin-left: 16px;
				&::before {
					width: 16px;
					// opacity: 1;
				}
			}
			:global(> * + :last-child) {
				&::before {
					display: none;
				}
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
