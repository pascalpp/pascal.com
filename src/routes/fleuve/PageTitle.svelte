<script lang="ts">
	import type { Page } from './pages.store';
	import { updatePage } from './pages.store';

	export let page: Page;
	export let tabindex: number;

	function onClick(event: MouseEvent) {
		if (!page.active) return;
		const target = event.target as HTMLElement;
		target.focus();
		requestAnimationFrame(() => selectTarget(target));
	}

	function onFocus(event: FocusEvent) {
		if (!page.active) return;
		const target = event.target as HTMLHeadingElement;
		selectTarget(target);
	}

	function selectTarget(target: HTMLElement) {
		if (window.getSelection && document.createRange) {
			const range = document.createRange();
			range.selectNodeContents(target);
			const selection = window.getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}

	function onBlur(event: FocusEvent) {
		const target = event.target as HTMLHeadingElement;
		const title = target.innerText.trim();
		if (!title) target.innerText = title;
		updatePage({ ...page, title });
		const selection = window.getSelection();
		selection?.removeAllRanges();
		const parentCard = target.closest('.page-card') as HTMLElement;
		parentCard?.focus();
	}

	function onKeyDown(event: KeyboardEvent) {
		event.stopPropagation();
		const target = event.target as HTMLHeadingElement;

		if (['Escape', 'Enter', 'Tab'].includes(event.key)) {
			event.preventDefault();
			target?.blur();
		}
	}
</script>

<h1
	class="title"
	class:active={page.active}
	contenteditable={page.active}
	tabindex={page.active ? tabindex : -1}
	on:click={onClick}
	on:focus={onFocus}
	on:blur={onBlur}
	on:keydown={onKeyDown}
>
	{page.title}
</h1>

<style lang="less">
	.title {
		padding: 0 16px;
		line-height: 2.25em;
		margin: 0 4px;
		flex-shrink: 0;
		white-space: nowrap;
		font-size: 16px;

		&:empty::before {
			content: var(--title-placeholder);
			opacity: 0.3;
		}

		&:focus-within {
			outline-style: auto;
			outline-width: 2px;
			outline-color: blue;
			outline-offset: -2px;
		}

		&:not(.active) {
			overflow: hidden;
			text-overflow: ellipsis;
			pointer-events: none;
		}

		&.active {
			pointer-events: auto;
			font-size: 20px;
		}
	}
</style>
