<script lang="ts">
	import type { Page } from './types';
	import './PageCard.less';

	export let page: Page;

	$: ({ active, connections = [] } = page);

	function setPageToActive() {
		page.active = true;
		deactivateChildPages(page);
	}

	function deactivateChildPages(p: Page) {
		p.connections?.forEach((c) => {
			c.active = false;
			deactivateChildPages(c);
		});
	}

	function updateTitle(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const title = target.innerText;
		if (event.key === 'Enter' && title) {
			event.preventDefault();
			page.title = title;
			target.blur();
		}
	}

	function addConnection(event: KeyboardEvent) {
		// const title = prompt('Title of the new page');
		const target = event.target as HTMLElement;
		const title = target.innerText;
		if (event.key === 'Enter' && title) {
			event.preventDefault();
			const id = Math.random().toString(36).slice(2);
			page.connections = [...connections, { id, title }];
			target.innerText = '';
		}
	}
</script>

<div class="page" class:active>
	<div class="page-content" on:click={setPageToActive}>
		<h1 contenteditable={active} on:keydown={updateTitle}>{page.title}</h1>
	</div>
	<div class="connections">
		{#each connections as connection}
			<svelte:self page={connection} />
		{/each}
		<div contenteditable="true" class="add-connection" on:keydown={addConnection} />
	</div>
</div>
