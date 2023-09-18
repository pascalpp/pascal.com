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
		updatePage({ ...page, title });
		const selection = window.getSelection();
		selection?.removeAllRanges();
	}

	function onKeyDown(event: KeyboardEvent) {
		const target = event.target as HTMLHeadingElement;

		if (event.key !== 'Tab') {
			event.stopPropagation();
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			(target.nextElementSibling as HTMLElement)?.focus();
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
		padding: 12px 16px;
		margin: 4px;
		flex-shrink: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		pointer-events: none;

		&:empty::before {
			content: 'Untitled page';
			opacity: 0.3;
		}

		&:focus-within {
			outline-style: auto;
			outline-width: 2px;
			outline-color: blue;
			outline-offset: -2px;
		}

		&.active {
			pointer-events: auto;
			font-size: 20px;
			border-bottom: 1px solid fade(black, 10%);
		}
	}
</style>
