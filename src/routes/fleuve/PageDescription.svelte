<script lang="ts">
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

<div class="description" tabindex={page.active && !editing ? tabindex : -1} on:focus={onFocus}>
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
