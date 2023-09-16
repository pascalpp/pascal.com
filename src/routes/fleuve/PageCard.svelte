<script lang="ts">
	import type { Page, PageId } from './Page.model';
	import './PageCard.less';
	import PageConnections from './PageConnections.svelte';
	import PageTitle from './PageTitle.svelte';
	import { updatePage, addConnection, pageStore } from './store';

	export let pageId: PageId;
	export let parentPageId: PageId | null;
	export let tabindex = 1;

	let page: Page;
	let node: HTMLDivElement;

	pageStore.subscribe((pages) => {
		page = pages.find((p) => p.id === pageId) as Page;
	});

	function onClickPage(event: MouseEvent) {
		activatePage(pageId);
	}

	function activatePage(id: PageId) {
		pageStore.update((pages) => {
			const parentPageIds = getAllParentPages(pages, id).map((item) => item.id);
			const activePageIds = [id, ...parentPageIds];
			const childPageIds = getAllChildPages(pages, id).map((item) => item.id);
			pages.forEach((item) => {
				if (childPageIds.includes(item.id)) {
					item.active = false;
				}
				if (activePageIds.includes(item.id)) {
					item.active = true;
				}
			});
			return pages;
		});
	}

	function getAllParentPages(pages: Page[], id: PageId): Page[] {
		const parentPage = pages.find((item) => item.connections.includes(id));
		return parentPage ? [parentPage, ...getAllParentPages(pages, parentPage.id)] : [];
	}

	function getAllChildPages(pages: Page[], id: PageId): Page[] {
		const parentPage = pages.find((item) => item.id === id);
		const childPages = parentPage?.connections.map((itemId) => pages.find((item) => item.id === itemId) as Page) ?? [];
		return childPages.reduce((acc, item) => [...acc, ...getAllChildPages(pages, item.id)], childPages);
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
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			const parentCard = node?.querySelector('.page-card') as HTMLElement;
			parentCard?.focus();
			parentCard?.click();
		}

		const target = event.target as HTMLElement;
		const title = target.innerText;
		if (event.key === 'Enter' && title) {
			event.preventDefault();
			addConnection(page, { title });
			target.innerText = '';
		}
	}

	function onKeyDownPage(event: KeyboardEvent) {
		console.log(event.key, node);
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			if (node.classList.contains('active')) {
				const nextNode = node
					.querySelector('.connections')
					?.querySelector('.page-card, .add-connection') as HTMLElement;
				console.log(nextNode);
				nextNode?.focus();
			} else {
				const card = node.querySelector('.page-card') as HTMLElement;
				card?.click();
			}
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			const previousNode = node.closest('.page')?.previousElementSibling?.querySelector('.page-card') as HTMLElement;
			previousNode?.focus();
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			const nextNode = node.closest('.page')?.nextElementSibling?.querySelector('.page-card') as HTMLElement;
			const addConnection = node.closest('.connections')?.querySelector(':scope > .add-connection') as HTMLElement;
			console.log(nextNode || addConnection);
			(<any>window).node = node;
			(nextNode || addConnection)?.focus();
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			const parentCard = node.closest('.connections')?.closest('.page')?.querySelector('.page-card') as HTMLElement;
			parentCard?.focus();
			parentCard?.click();
		}

		if (event.key === 'Backspace') {
			event.preventDefault();
			const confirmed = confirm('Are you sure you want to remove this page and all of its connections?');
			if (confirmed) {
				pageStore.update((pages) => {
					const connectedPageIds = getAllChildPages(pages, pageId).map((item) => item.id);
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
		<div class="page" class:active={page.active} bind:this={node}>
			<button class="page-card" on:click={onClickPage} {tabindex} on:keydown={onKeyDownPage}>
				<PageTitle {page} {tabindex} />
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
