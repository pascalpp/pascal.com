<script lang="ts">
	import type { Page, PageId } from './Page.model';
	import './PageCard.less';
	import { updatePage, addConnection, pageStore } from './store';

	export let pageId: PageId;
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

	function updateTitle(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const title = target.innerText;
		if (event.key === 'Enter' && title) {
			event.preventDefault();
			updatePage({ ...page, title });
			target.blur();
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
</script>

{#key page?.id}
	{#if page}
		<div class="page" class:active={page.active}>
			<div class="page-card" on:click={onClickPage}>
				<h1 class="title" contenteditable={page.active} on:keydown={updateTitle}>{page.title}</h1>
			</div>
			<div class="connections">
				{#each page.connections as connectionId}
					<svelte:self pageId={connectionId} />
				{/each}
				<div autofocus={true} contenteditable="true" class="add-connection" on:keydown={onAddPage} />
			</div>
		</div>
	{/if}
{/key}
