<script lang="ts">
	import type { Page, PageId } from './pages.store';
	import PageView from './PageView.svelte';
	import AddPageCard from './AddPageCard.svelte';
	import PageConnectionSummary from './PageConnectionSummary.svelte';
	import { settings } from './settings.store';

	export let page: Page;
	export let parentId: PageId | undefined = undefined;
	export let tabindex: number;

	$: connections = page.connections;
	$: opacity = $settings.childOpacity;
	$: showLeftBorder = (page.active && page.connections.length > 0) || (opacity > 0 && page.connections.length > 1);
</script>

<div
	class="connections"
	class:active={page.active || opacity === 0}
	class:show-left-border={showLeftBorder}
	class:nested={parentId}
>
	{#if page.active || opacity > 0}
		{#each connections as connectionId, index (connectionId)}
			<PageView
				pageId={connectionId}
				{tabindex}
				parentId={page.id}
				previousSiblingId={connections[index - 1]}
				nextSiblingId={connections[index + 1]}
			/>
		{/each}
		{#if page.active}
			<AddPageCard {page} {tabindex} parentId={page.id} siblingId={connections[connections.length - 1]} />
		{/if}
	{:else}
		<PageConnectionSummary {page} {tabindex} />
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

		&.nested {
			width: max-content;
			&.show-left-border {
				margin-left: 24px;
				// background-color: fade(red, 10%);
				position: relative;
				&::before {
					position: absolute;
					display: block;
					content: '';
					height: 1px;
					width: 24px;
					border-bottom: 1px solid black;
					top: 25px;
					right: 100%;
				}
				&::after {
					position: absolute;
					display: block;
					content: '';
					width: 1px;
					border-left: 1px solid black;
					top: 25px;
					bottom: 0;
				}
			}
			:global(> *) {
				margin-left: 24px;
				position: relative;
				&::before {
					position: absolute;
					display: block;
					content: '';
					height: 1px;
					width: 24px;
					border-bottom: 1px solid black;
					top: 25px;
					right: 100%;
				}
			}

			:global(> :last-child:not(:first-child)) {
				&::before {
					position: absolute;
					display: block;
					content: '';
					width: 24px;
					border: none;
					background-color: transparent;
					border-left: 1px solid black;
					border-bottom: 1px solid black;
					border-bottom-left-radius: 4px;
					top: unset;
					height: 50%;
					bottom: 50%;
					right: 100%;
					z-index: 2;
				}
				&::after {
					z-index: 1;
					background-color: #f3f3f3; // needs to match background color
					position: absolute;
					display: block;
					content: '';
					width: 12px;
					border: none;
					height: 100%;
					bottom: 0;
					right: calc(100% + 12px);
				}
			}
		}
	}
</style>
