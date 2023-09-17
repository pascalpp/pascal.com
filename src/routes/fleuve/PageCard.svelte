<script lang="ts">
	import './PageCard.less';
	import type { Page, PageId } from './Page.model';
	import PageConnections from './PageConnections.svelte';
	import PageDescription from './PageDescription.svelte';
	import PageTitle from './PageTitle.svelte';
	import { pageStore, activatePage, removePage, updatePage } from './store';

	export let pageId: PageId;
	export let tabindex = 1;

	let page: Page;

	pageStore.subscribe((pages) => {
		page = pages.find((p) => p.id === pageId) as Page;
	});

	function onClick(event: MouseEvent) {
		activatePage(pageId);
		const card = event.target as HTMLElement;
		requestAnimationFrame(() => {
			card?.focus();
			card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}

	function onKeyDown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const previousNode = target.closest('.page')?.previousElementSibling?.querySelector('.page-card') as HTMLElement;
		const nextNode = target.closest('.page')?.nextElementSibling?.querySelector('.page-card') as HTMLElement;
		const addConnection = target.closest('.connections')?.querySelector(':scope > .add-connection') as HTMLElement;

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			if (page.active) {
				const firstChild = target
					.closest('.page')
					?.querySelector('.connections')
					?.querySelector('.page-card, .add-connection') as HTMLElement;
				firstChild?.focus();
			} else {
				target.click();
			}
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			previousNode?.focus();
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			(nextNode || addConnection)?.focus();
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			const parentCard = target
				.closest('.page')
				?.closest('.connections')
				?.closest('.page')
				?.querySelector('.page-card') as HTMLElement;
			if (page.active) {
				updatePage({ ...page, active: false });
			} else {
				parentCard?.click();
			}
		}

		if (event.key === 'Enter') {
			if (page.active) {
				event.preventDefault();
				updatePage({ ...page, active: false });
			}
		}

		if (event.key === 'Backspace') {
			event.preventDefault();
			const confirmed = confirm('Are you sure you want to remove this page and all of its connections?');
			if (confirmed) {
				removePage(page.id);
				(nextNode || previousNode || addConnection)?.focus();
			}
		}
	}
</script>

{#key page?.id}
	{#if page}
		<div class="page" class:active={page.active}>
			<button class="page-card" on:click={onClick} {tabindex} on:keydown={onKeyDown}>
				<PageTitle {page} {tabindex} />
				<PageDescription {page} {tabindex} />
			</button>
			<PageConnections {page} tabindex={tabindex + 1} />
		</div>
	{/if}
{/key}
