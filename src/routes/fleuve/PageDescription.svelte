<script lang="ts">
	import type { Page } from './Page.model';
	import { updatePage } from './store';

	export let page: Page;
	export let tabindex: number;

	function onBlurDescription(event: FocusEvent) {
		const target = event.target as HTMLElement;
		const description = target.innerText;
		updatePage({ ...page, description });
	}

	function onKeyDownDescription(event: KeyboardEvent) {
		if (event.key !== 'Tab') {
			event.stopPropagation();
		}
	}
</script>

<p
	class="description"
	contenteditable={page.active}
	tabindex={page.active ? tabindex : -1}
	on:blur={onBlurDescription}
	on:keydown={onKeyDownDescription}>
	{page.description || ''}
</p>
