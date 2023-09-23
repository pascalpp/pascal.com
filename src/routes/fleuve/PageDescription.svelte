<script lang="ts">
	import './markdown.less';
	import type { Page, PageId } from './pages.store';
	import { updatePage } from './pages.store';
	import { marked } from 'marked';
	import Pencil from './pencil.svg?component';
	import { settings } from './settings.store';
	import { focusAddCard, focusPageId } from './focusHelpers';
	import {
		activatePage,
		reorderPage,
		movePageUp,
		movePageDown,
		addParentAbovePage,
		replaceEmptyParent,
	} from './pages.store';

	export let page: Page;
	export let taborder: number;
	export let parentId: PageId;
	export let previousSiblingId: PageId | undefined = undefined;
	export let nextSiblingId: PageId | undefined = undefined;
	export let firstChildId: PageId | undefined = undefined;

	let editing = false;
	let editor: HTMLElement;

	$: active = page.active && $settings.showDescription;
	$: focus = page.focus && $settings.showDescription;

	function startEditing() {
		editing = true;
		requestAnimationFrame(() => {
			editor?.focus();
		});
	}

	function onClickEdit(event: MouseEvent) {
		event.stopPropagation();
		startEditing();
	}

	function onBlur(event: FocusEvent) {
		const target = event.target as HTMLElement;
		const description = target.innerText.trim();
		if (!description) target.innerText = description;
		updatePage({ ...page, description });
		editing = false;
	}

	function onKeyDownEditButton(event: KeyboardEvent) {
		if (['d', 'e'].includes(event.key.toLowerCase())) {
			startEditing();
		}

		if (event.key === 'Enter') {
			event.stopPropagation();
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			if (event.shiftKey) {
				const newParent = movePageDown(page.id);
				if (active) {
					activatePage(newParent.id);
					activatePage(page.id);
				}
				requestAnimationFrame(() => {
					focusPageId(page.id);
				});
			} else if (event.altKey) {
				const newParent = addParentAbovePage(page.id);
				requestAnimationFrame(() => {
					activatePage(newParent.id);
					if (active) {
						activatePage(page.id);
					}
					requestAnimationFrame(() => {
						focusPageId(page.id);
					});
				});
			} else {
				focusPageId(firstChildId) || focusAddCard(page.id) || activatePage(page.id);
			}
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (event.shiftKey) {
				reorderPage(page.id, 'up');
				requestAnimationFrame(() => {
					focusPageId(page.id);
				});
			} else {
				focusPageId(previousSiblingId);
			}
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (event.shiftKey) {
				reorderPage(page.id, 'down');
				requestAnimationFrame(() => {
					focusPageId(page.id);
				});
			} else {
				focusPageId(nextSiblingId) || focusAddCard(parentId);
			}
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			if (event.shiftKey) {
				movePageUp(page.id);
				requestAnimationFrame(() => {
					const el = focusPageId(page.id);
					if (active) el?.click();
				});
			} else if (event.altKey) {
				replaceEmptyParent(page.id);
				requestAnimationFrame(() => {
					const el = focusPageId(page.id);
					if (active) el?.click();
				});
			} else {
				focusPageId(parentId);
			}
		}
	}

	function onKeyDownEditor(event: KeyboardEvent) {
		if (event.key !== 'Tab') {
			event.stopPropagation();
		}

		if (['Escape'].includes(event.key)) {
			event.stopPropagation();
			event.preventDefault();
			focusPageId(page.id);
		}
	}

	function onClickEditor(event: MouseEvent) {
		event.stopPropagation();
	}
</script>

<div class="description" class:active class:focus class:editing>
	{#if active && !editing}
		<button
			type="button"
			class="edit-button"
			id={`edit-description-${page.id}`}
			on:click={onClickEdit}
			on:keydown={onKeyDownEditButton}
			tabindex={active && focus ? taborder : -1}
			title={page.description ? 'Edit description' : 'Add description'}
		>
			<Pencil />
		</button>
	{/if}

	<div class="scrollable">
		{#if active && focus && editing}
			<div
				class="editor"
				bind:this={editor}
				on:keydown={onKeyDownEditor}
				on:click={onClickEditor}
				on:blur={onBlur}
				contenteditable="true"
				role="textbox"
				aria-multiline="true"
				tabindex={taborder}
				data-testid="Description Editor"
			>
				{page.description || ''}
			</div>
		{:else}
			<div class="content markdown" on:dblclick={onClickEdit} role="document">
				{@html marked.parse(page.description || '')}
			</div>
		{/if}
	</div>
</div>

<style lang="less">
	.description {
		display: flex;
		flex-direction: column;
		pointer-events: none;
		position: relative;
		flex-grow: 1;
		overflow: hidden;
		max-width: 0;
		max-height: 0;
		opacity: 0;
		border-top: 0px solid transparent;
		isolation: isolate;

		&.active {
			@height-transition-time: calc(var(--card-animation-speed) * 2);
			transition: opacity @height-transition-time ease-in-out, max-height @height-transition-time ease-in-out,
				border-color @height-transition-time ease-in-out;
			transition-delay: @height-transition-time;
			border-top: 1px solid fade(black, 30%);
			pointer-events: auto;
			opacity: 1;
			--width: calc(var(--card-max-width) * var(--active-page-scale, 1));
			--height: calc(var(--width) / var(--aspect-ratio));
			max-width: var(--width);
			max-height: var(--height);
		}

		.scrollable {
			overflow: auto;
			flex-grow: 1;
			padding: 18px;
		}
		&:not(.editing) .scrollable {
			mask-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 1) 20px);
		}
		&.editing .scrollable {
			&:focus-within {
				outline-style: auto;
				outline-width: 2px;
				outline-color: blue;
				outline-offset: -4px;
			}
		}

		.editor,
		.content {
			display: block;
			padding-bottom: 48px;
			outline: none;
		}
		.editor {
			white-space: pre-wrap;
			overflow-wrap: break-word;
			min-height: 100%;
			padding-bottom: 36px;
		}

		.content {
			&:empty::before {
				font-weight: normal;
				content: var(--description-placeholder);
				opacity: 0.5;
			}
		}

		.edit-button {
			opacity: 0;
			position: absolute;
			cursor: pointer;
			right: 16px;
			bottom: 16px;
			z-index: 1;
			:global(svg) {
				width: auto;
				height: 16px;
			}
			background-color: white;
			color: black;
			border: 1px solid black;
			padding: 4px 12px;
			border-radius: 4px;

			&:focus {
				opacity: 1;
				outline-style: solid;
				outline-width: 1px;
				outline-color: black;
			}
		}

		&:hover,
		&.focus {
			.edit-button {
				opacity: 0.5;
				&:hover,
				&:focus {
					opacity: 1;
				}
			}
		}
	}
</style>
