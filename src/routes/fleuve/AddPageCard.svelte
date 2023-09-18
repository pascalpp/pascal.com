<script lang="ts">
	import type { Page } from './Page.model';
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
	on:focus={onFocus}
	on:blur={onBlur}
	on:keydown={onKeyDown}
	on:keyup={onKeyUp}
/>
