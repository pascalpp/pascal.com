<script lang="ts">
	import type { Page } from './pages.store';
	import { addConnection } from './pages.store';

	export let page: Page;
	export let tabindex: number;

	function onFocus(event: FocusEvent) {
		const target = event.target as HTMLHeadingElement;
		target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		if (window.getSelection && document.createRange) {
			const range = document.createRange();
			range.selectNodeContents(target);
			const selection = window.getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}

	function onKeyDown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const title = target.innerText.trim();

		if (event.key === 'ArrowLeft' && !title) {
			event.preventDefault();
			const parentCard = target.closest('.page')?.querySelector('.page-card') as HTMLElement;
			parentCard?.focus();
			parentCard?.click();
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			const previousNode = target.previousElementSibling?.querySelector('.page-card') as HTMLElement;
			previousNode?.focus();
		}

		if (event.key === 'Enter' && title) {
			event.preventDefault();
			addConnection(page, { title });
			target.innerText = '';
			requestAnimationFrame(() => {
				const previousNode = target.previousElementSibling?.querySelector('.page-card') as HTMLElement;
				previousNode?.click();
			});
		}
	}

	function onKeyUp(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const title = target.innerText.trim();
		if (!title) target.innerText = title;
	}

	function onBlur(event: FocusEvent) {
		const target = event.target as HTMLElement;
		target.innerText = target.innerText.trim();
	}
</script>

<div
	{tabindex}
	contenteditable="true"
	class="add-connection"
	class:show={page.active}
	on:focus={onFocus}
	on:blur={onBlur}
	on:keydown={onKeyDown}
	on:keyup={onKeyUp}
/>

<style lang="less">
	.add-connection {
		display: none;
		&.show {
			display: block;
		}

		background-color: white;
		box-sizing: border-box;
		border: 1px solid fade(black, 30%);
		padding: 1px 20px;
		line-height: 2.25em;
		margin: 0 4px;
		border-radius: 4px;
		margin: 0;
		margin-left: 24px;
		width: auto;
		appearance: none;
		font-weight: bold;
		white-space: nowrap;
		position: relative;
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
		&:empty::after {
			font-weight: normal;
			content: var(--add-placeholder);
			opacity: 0.5;
		}
		&:focus,
		&:active {
			outline-style: solid;
			outline-width: 2px;
			outline-color: black;
		}
	}
</style>
