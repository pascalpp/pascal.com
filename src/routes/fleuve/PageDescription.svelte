<script lang="ts">
	import './markdown.less';
	import type { Page } from './pages.store';
	import { updatePage } from './pages.store';
	import { marked } from 'marked';
	import Pencil from './pencil.svg?component';

	export let page: Page;
	export let tabindex: number;
	export let expanded = false;

	let editing = false;
	let editor: HTMLElement;

	function onClickEdit(event: MouseEvent) {
		event.stopPropagation();
		editing = true;
		requestAnimationFrame(() => {
			editor?.focus();
		});
	}

	function onBlur(event: FocusEvent) {
		const target = event.target as HTMLElement;
		const description = target.innerText.trim();
		updatePage({ ...page, description });
		editing = false;
		const parentCard = target.closest('.page-card') as HTMLElement;
		parentCard?.focus();
	}

	function onKeyDown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const description = target.innerText.trim();
		if (event.key !== 'Tab') {
			event.stopPropagation();
		}

		if (event.key === 'Escape') {
			const card = target?.closest('.page-card') as HTMLElement;
			target?.blur();
			card?.focus();
		}

		if (event.key === 'ArrowLeft' && !description) {
			const parentCard = target.closest('.connections')?.closest('.page')?.querySelector('.page-card') as HTMLElement;
			target.innerText = description;
			parentCard?.focus();
			parentCard?.click();
		}

		if (event.key === 'ArrowRight' && !description) {
			target.innerText = description;
			const firstChild = target
				.closest('.page')
				?.querySelector('.connections')
				?.querySelector('.page-card, .add-connection') as HTMLElement;
			firstChild?.focus();
		}
	}
</script>

<div class="description" class:active={page.active} class:expanded>
	{#if editing}
		<div
			class="editor"
			bind:this={editor}
			tabindex={page.active ? tabindex : -1}
			contenteditable={page.active}
			on:blur={onBlur}
			on:keydown={onKeyDown}
		>
			{page.description || ''}
		</div>
	{:else}
		<div class="content markdown" on:dblclick={onClickEdit}>
			{@html marked.parse(page.description || '')}
		</div>
	{/if}

	{#if page.active && !editing}
		<button class="edit-button" on:click={onClickEdit}>
			<Pencil />
		</button>
	{/if}
</div>

<style lang="less">
	.description {
		display: none;
		pointer-events: none;
		position: relative;

		&.active {
			border-top: 1px solid fade(black, 10%);
			display: flex;
			pointer-events: auto;
			opacity: 0;
			transition: opacity 0.1s ease-in-out;
			&.expanded {
				opacity: 1;
			}
		}

		padding: 12px;
		margin: 4px;
		margin-bottom: 4px;
		flex-grow: 1;
		flex-direction: column;
		overflow: hidden;
		&:focus-within {
			outline-style: auto;
			outline-width: 2px;
			outline-color: blue;
			outline-offset: -2px;
		}

		.editor,
		.content {
			padding: 4px;
			flex: 1;
			padding-bottom: 48px;
			outline: none;
			overflow-y: scroll;
		}
		.editor {
			display: block;
			white-space: pre-wrap;
			overflow-wrap: break-word;
			min-height: 100%;
			padding-bottom: 48px;
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
			right: 12px;
			bottom: 12px;
			:global(svg) {
				width: auto;
				height: 16px;
			}
			background-color: white;
			color: black;
			border: 1px solid black;
			padding: 4px 12px;
			border-radius: 4px;
		}

		&:hover {
			.edit-button {
				opacity: 0.3;
				&:hover {
					opacity: 1;
				}
			}
		}
	}
</style>
