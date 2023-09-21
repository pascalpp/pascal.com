<script lang="ts">
	import './markdown.less';
	import type { Page } from './pages.store';
	import { updatePage } from './pages.store';
	import { marked } from 'marked';
	import Pencil from './pencil.svg?component';

	export let page: Page;
	export let tabindex: number;

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
		return;
		const target = event.target as HTMLElement;
		const description = target.innerText.trim();
		// if (event.key !== 'Tab') {
		// 	event.stopPropagation();
		// }

		// if (event.key === 'Escape' || event.key === 'Tab') {
		// 	target?.blur();
		// }

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

<div class="description" class:active={page.active}>
	{#if page.active && !editing}
		<button class="edit-button" on:click={onClickEdit}>
			<Pencil />
		</button>
	{/if}

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

		&.active {
			pointer-events: auto;
			transition: opacity 0.2s ease-in-out, max-height 0.2s ease-in-out, border-color 0.2s ease-in-out;
			transition-delay: 0.2s;
			border-top: 1px solid fade(black, 30%);
			opacity: 1;
			--width: calc(var(--card-max-width) * var(--active-page-scale, 1));
			--height: calc(var(--width) / var(--aspect-ratio));
			max-width: var(--width);
			max-height: var(--height);
		}

		&:focus-within {
			outline-style: auto;
			outline-width: 2px;
			outline-color: blue;
			outline-offset: -10px;
		}

		.editor,
		.content {
			padding: 18px;
			flex: 1;
			padding-bottom: 48px;
			outline: none;
			overflow-y: scroll;
			mask-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 1) 40px);
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
