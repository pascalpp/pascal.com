<script lang="ts">
	import './PageCard.less';
	import type { Page, PageId } from './Page.model';
	import PageConnections from './PageConnections.svelte';
	import PageDescription from './PageDescription.svelte';
	import PageTitle from './PageTitle.svelte';
	import { pageStore, activatePage, removePage } from './store';

	export let pageId: PageId;
	export let tabindex = 1;

	let page: Page;
	let node: HTMLDivElement;

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
		const previousNode = node.closest('.page')?.previousElementSibling?.querySelector('.page-card') as HTMLElement;
		const nextNode = node.closest('.page')?.nextElementSibling?.querySelector('.page-card') as HTMLElement;
		const addConnection = node.closest('.connections')?.querySelector(':scope > .add-connection') as HTMLElement;

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			if (node.classList.contains('active')) {
				const firstChild = node
					.querySelector('.connections')
					?.querySelector('.page-card, .add-connection') as HTMLElement;
				firstChild?.focus();
			} else {
				const card = node.querySelector('.page-card') as HTMLElement;
				card?.click();
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
			const parentCard = node.closest('.connections')?.closest('.page')?.querySelector('.page-card') as HTMLElement;
			parentCard?.focus();
			parentCard?.click();
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
		<div class="page" class:active={page.active} bind:this={node}>
			<button class="page-card" on:click={onClick} {tabindex} on:keydown={onKeyDown}>
				<PageTitle {page} {tabindex} />
				<PageDescription {page} {tabindex} />
			</button>
			<PageConnections {page} tabindex={tabindex + 1} />
		</div>
	{/if}
{/key}
