<script lang="ts">
	import AddPageCard from './AddPageCard.svelte';
	import type { Page } from './pages.store';
	import PageView from './PageView.svelte';
	import PageConnectionSummary from './PageConnectionSummary.svelte';
	import { settings } from './settings.store';

	export let page: Page;
	export let tabindex: number;

	$: opacity = $settings.childOpacity;
	$: showLeftBorder = (page.active && page.connections.length > 0) || (opacity > 0 && page.connections.length > 1);
</script>

<div class="connections" class:active={page.active || opacity === 0} class:show-left-border={showLeftBorder}>
	{#if page.active || opacity > 0}
		{#each page.connections as connectionId, index (connectionId)}
			<PageView pageId={connectionId} {tabindex} parentId={page.id} />
		{/each}
		{#if page.active}
			<AddPageCard {page} {tabindex} />
		{/if}
	{:else}
		<PageConnectionSummary {page} />
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
			width: max-content;
			left: 100%;
			top: 0;
			&.show-left-border {
				.left-border-rules; // moved to variables.less until Firefox :has()
			}
		}

		&:not(:first-child) {
			&.active:has(:first-child:not(:last-child)),
			&:has(.page + .page) {
				.left-border-rules;

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
