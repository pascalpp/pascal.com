<script lang="ts">
	import './description_markdown.less';
	import type { Page } from './pages.store';
	import { updatePage } from './pages.store';
	import { marked } from 'marked';

	export let page: Page;
	export let tabindex: number;

	let editing = false;

	function onFocus(event: FocusEvent) {
		const target = event.target as HTMLElement;
		editing = true;
		requestAnimationFrame(() => {
			const editor = target?.querySelector('.editor') as HTMLElement;
			editor?.focus();
		});
	}

	function onBlur(event: FocusEvent) {
		const target = event.target as HTMLElement;
		const description = target.innerText.trim();
		updatePage({ ...page, description });
		editing = false;
	}

	function onKeyDown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const description = target.innerText.trim();
		if (event.key !== 'Tab') {
			event.stopPropagation();
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

<div
	class="description"
	class:active={page.active}
	tabindex={page.active && !editing ? tabindex : -1}
	on:focus={onFocus}
>
	{#if editing}
		<div
			class="editor"
			tabindex={page.active ? tabindex : -1}
			contenteditable={page.active}
			on:blur={onBlur}
			on:keydown={onKeyDown}
		>
			{page.description || ''}
		</div>
	{:else}
		<div class="content">
			{@html marked.parse(page.description || '')}
		</div>
	{/if}
</div>

<style lang="less">
	.description {
		display: none;
		pointer-events: none;
		&.active {
			display: flex;
			pointer-events: auto;
		}

		padding: 12px;
		padding-top: 0;
		margin: 4px;
		flex-grow: 1;
		flex-direction: column;
		overflow: hidden;
		overflow-y: scroll;
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
	}
</style>
