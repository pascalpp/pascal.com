<script lang="ts">
	import type { Page, PageId } from './Page.model';
	import './PageCard.less';
	import PageConnections from './PageConnections.svelte';
	import { updatePage, addConnection, pageStore } from './store';

	export let pageId: PageId;
	export let parentPageId: PageId | null;
	export let tabindex = 1;

	let page: Page;

	pageStore.subscribe((pages) => {
		page = pages.find((p) => p.id === pageId) as Page;
	});

	function onClickPage(event: MouseEvent) {
		updatePage({ ...page, active: true });
		deactivateChildPages(page);
	}

	function getAllConnectedPages(pages: Page[], p: Page): Page[] {
		const connections = p.connections.map((id) => pages.find((p) => p.id === id) as Page);
		return connections.reduce((acc, item) => [...acc, ...getAllConnectedPages(pages, item)], connections);
	}

	function deactivateChildPages(p: Page) {
		pageStore.update((pages) => {
			const connectedPageIds = getAllConnectedPages(pages, p).map((item) => item.id);
			pages.forEach((page) => {
				if (connectedPageIds.includes(page.id)) {
					page.active = false;
				}
			});
			return pages;
		});
	}

	function updateTitle(event: FocusEvent) {
		const target = event.target as HTMLElement;
		const title = target.innerText;
		updatePage({ ...page, title });
	}
	function onKeyDownTitle(event: KeyboardEvent) {
		if (event.key !== 'Tab') {
			event.stopPropagation();
		}
	}

	function updateDescription(event: FocusEvent) {
		const target = event.target as HTMLElement;
		const description = target.innerText;
		updatePage({ ...page, description });
	}
	function onKeyDownDescription(event: KeyboardEvent) {
		if (event.key !== 'Tab') {
			event.stopPropagation();
		}
	}

	function onAddPage(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const title = target.innerText;
		if (event.key === 'Enter' && title) {
			event.preventDefault();
			addConnection(page, { title });
			target.innerText = '';
		}
	}

	function onKeyDownPage(event: KeyboardEvent) {
		if (event.key === 'Backspace') {
			event.preventDefault();
			const confirmed = confirm('Are you sure you want to remove this page and all of its connections?');
			if (confirmed) {
				pageStore.update((pages) => {
					const connectedPageIds = getAllConnectedPages(pages, page).map((item) => item.id);
					const ids = [page.id, ...connectedPageIds];
					pages.filter((item) => {
						if (item.id === parentPageId) {
							item.connections = item.connections.filter((id) => id !== pageId);
						}
						return !ids.includes(item.id);
					});
					return pages;
				});
			}
		}
	}
</script>

{#key page?.id}
	{#if page}
		<div class="page" class:active={page.active}>
			<button class="page-card" on:click={onClickPage} {tabindex} on:keydown={onKeyDownPage}>
				<h1
					class="title"
					contenteditable={page.active}
					tabindex={page.active ? tabindex : -1}
					on:blur={updateTitle}
					on:keydown={onKeyDownTitle}>
					{page.title || 'Untitled'}
				</h1>
				<p
					class="description"
					contenteditable={page.active}
					tabindex={page.active ? tabindex : -1}
					on:blur={updateDescription}
					on:keydown={onKeyDownDescription}>
					{page.description || ''}
				</p>
			</button>
			<PageConnections connections={page.connections} {onAddPage} tabindex={tabindex + 1} {pageId} />
		</div>
	{/if}
{/key}
