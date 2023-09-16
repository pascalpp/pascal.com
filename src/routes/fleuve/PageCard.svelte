<script lang="ts">
	import type { Page } from './Page.model';
	import './PageCard.less';
	import { updatePage, addConnection, pageStore } from './store';

	let pages = $pageStore;
	export let id = $pageStore[0].id;

	$: page = pages.find((p) => p.id === id) as Page;
	$: active = page?.active;
	$: connections = page?.connections;

	$: console.log('PageCard pages:', pages.length);
	$: console.log('PageCard connections:', connections.length);

	function setPageToActive() {
		updatePage({ ...page, active: true });
		deactivateChildPages(page);
	}

	function deactivateChildPages(p: Page) {
		pages
			.filter((item) => item.id && p.connections.includes(item.id))
			.forEach((c) => {
				updatePage({ ...c, active: false });
				deactivateChildPages(c);
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

{#key page.id}
	{#if page}
		<div class="page" class:active>
			<div class="page-card" on:click={setPageToActive}>
				<h1 contenteditable={active} on:keydown={updateTitle}>{page.title}</h1>
			</div>
			<div class="connections">
				{#each connections as connectionId}
					<svelte:self id={connectionId} />
				{/each}
				<div contenteditable="true" class="add-connection" on:keydown={onAddPage} />
			</div>
		</div>
	{/if}
{/key}
