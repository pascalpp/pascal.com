<script lang="ts">
	import type { Page } from './Page.model';
	import { addConnection } from './store';

	export let page: Page;
	export let tabindex: number;

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
		}
	}
</script>

<div {tabindex} autofocus={true} contenteditable="true" class="add-connection" on:keydown={onKeyDown} />
