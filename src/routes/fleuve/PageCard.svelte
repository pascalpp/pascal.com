<script lang="ts">
	import PageDescription from './PageDescription.svelte';
	import PageTitle from './PageTitle.svelte';
	import type { Page } from './pages.store';
	import { activatePage, removePage, updatePage, movePage } from './pages.store';

	export let page: Page;
	export let tabindex = 1;

	function onClick(event: MouseEvent) {
		activatePage(page.id);
		const card = event.target as HTMLElement;
		requestAnimationFrame(() => {
			card?.focus();
			card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}

	function onKeyDown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const previousNode = target.closest('.page')?.previousElementSibling?.querySelector('.page-card') as HTMLElement;
		const nextCard = target.closest('.page')?.nextElementSibling?.querySelector('.page-card') as HTMLElement;
		const addConnection = target.closest('.connections')?.querySelector(':scope > .add-connection') as HTMLElement;
		const nextNode = nextCard || addConnection;

		if (['d', 'e'].includes(event.key.toLowerCase())) {
			if (page.active) {
				const editButton = target?.querySelector('.description .edit-button') as HTMLButtonElement;
				editButton?.click();
			}
		}

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
			if (event.shiftKey) {
				movePage(page.id, 'up');
				requestAnimationFrame(() => {
					target?.focus();
				});
			} else {
				previousNode?.focus();
			}
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (event.shiftKey) {
				movePage(page.id, 'down');
				requestAnimationFrame(() => {
					target?.focus();
				});
			} else {
				nextNode?.focus();
			}
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
			event.preventDefault();
			if (page.active) {
				updatePage({ ...page, active: false });
			} else {
				target.click();
			}
		}

		// Space key
		if (event.key === ' ') {
			event.preventDefault();
			if (!page.active) {
				target.click();
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

<div class="page-card" class:active={page.active} {tabindex} on:click={onClick} on:keydown={onKeyDown}>
	<div class="page-card-content">
		<PageTitle {page} {tabindex} />
		<PageDescription {page} {tabindex} />
	</div>
</div>

<style lang="less">
	.page-card {
		flex: 1;
		background-color: white;
		box-sizing: border-box;
		border: 1px solid fade(black, 30%);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		transform: translateX(-1px);
		cursor: pointer;

		&.active {
			box-shadow: 0 2px 4px 2px fade(black, 10%);
			padding-top: 4px;
		}

		&:focus,
		&:focus-within,
		&:active {
			border-color: transparent;
			outline-style: solid;
			outline-width: 2px;
			outline-color: black;
		}

		// active page animation
		@transition-time: 0.1s;
		@transition-delay: 0.1s;
		width: fit-content;
		min-width: 40px;
		min-height: 40px;
		max-height: 56px;
		transition: min-height @transition-time ease-in-out, max-height @transition-time ease-in-out,
			min-width @transition-time ease-in-out @transition-delay;
		&.active {
			--height: calc(var(--active-page-scale, 0.5) * 75vh);
			min-height: var(--height);
			max-height: var(--height);
			min-width: calc(var(--height) * var(--aspect-ratio));
			max-width: calc(var(--height) * var(--aspect-ratio));
			transition: min-height @transition-time ease-in-out @transition-delay,
				max-height @transition-time ease-in-out @transition-delay, min-width @transition-time ease-in-out;
		}

		.page-card-content {
			overflow: hidden;
			width: 100%;
			flex: 1;
			display: flex;
			flex-direction: row;
			align-items: stretch;
			display: flex;
			flex-direction: column;
		}

		&:focus-within {
			--description-placeholder: 'Add description';
		}

		// stacked page idea
		// &.active:has(.page.active) {
		// 	> .page-card {
		// 		position: absolute;
		// 		&::after {
		// 			display: none;
		// 		}
		// 	}

		// 	.page.active {
		// 		padding-left: 1em;
		// 		padding-top: 6em;
		// 	}
		// }
	}
</style>
