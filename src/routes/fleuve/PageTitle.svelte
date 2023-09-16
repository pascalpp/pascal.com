<script lang="ts">
	import type { Page } from './Page.model';
	import { updatePage } from './store';

	export let page: Page;
	export let tabindex: number;

	function onBlurTitle(event: FocusEvent) {
		const target = event.target as HTMLDivElement;
		const title = target.innerText;
		updatePage({ ...page, title });
	}

	function onKeyDownTitle(event: KeyboardEvent) {
		const target = event.target as HTMLDivElement;

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
	contenteditable={page.active}
	tabindex={page.active ? tabindex : -1}
	on:blur={onBlurTitle}
	on:keydown={onKeyDownTitle}>
	{page.title}
</h1>
