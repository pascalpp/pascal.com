<script lang="ts">
	import type { Page } from './Page.model';
	import { updatePage } from './store';

	export let page: Page;
	export let tabindex: number;

	function onBlur(event: FocusEvent) {
		const target = event.target as HTMLElement;
		const description = target.innerText.trim();
		updatePage({ ...page, description });
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

<p
	class="description"
	contenteditable={page.active}
	tabindex={page.active ? tabindex : -1}
	on:blur={onBlur}
	on:keydown={onKeyDown}
>
	{page.description || ''}
</p>
