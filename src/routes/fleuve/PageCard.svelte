<script lang="ts">
	import { onMount } from 'svelte';
	import PageDescription from './PageDescription.svelte';
	import PageTitle from './PageTitle.svelte';
	import type { Page, PageId } from './pages.store';
	import {
		activatePage,
		removePage,
		updatePage,
		reorderPage,
		movePageUp,
		movePageDown,
		addParentAbovePage,
		replaceEmptyParent,
		focusPage,
		deactivatePage,
	} from './pages.store';

	export let page: Page;
	export let parentId: PageId;
	export let tabindex = 1;

	let card: HTMLDivElement;

	function onClick(event: MouseEvent) {
		activatePage(page.id);
		focusPage(page.id);
	}

	function onFocus() {
		focusPage(page.id);
	}

	function onKeyDown(event: KeyboardEvent) {
		event.stopPropagation();
		const target = event.target as HTMLElement;
		const previousNode = target.closest('.page')?.previousElementSibling?.querySelector('.page-card') as HTMLElement;
		const nextCard = target.closest('.page')?.nextElementSibling?.querySelector('.page-card') as HTMLElement;
		const addConnection = target.closest('.connections')?.querySelector(':scope > .add-connection') as HTMLElement;
		const nextNode = nextCard || addConnection;
		const active = page.active;

		if (['d', 'e'].includes(event.key.toLowerCase())) {
			if (page.active) {
				const editButton = target?.querySelector('.description .edit-button') as HTMLButtonElement;
				editButton?.click();
			}
		}

		if (event.key === 'Tab') {
			event.preventDefault();
			if (page.active) {
				const title = target?.querySelector('.title') as HTMLButtonElement;
				title?.click();
			} else {
				activatePage(page.id);
			}
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			if (event.shiftKey) {
				const newParent = movePageDown(page.id);
				requestAnimationFrame(() => {
					const newParentCard = document.querySelector(`[data-page-id="${newParent?.id}"]`) as HTMLElement;
					const newCard = document.querySelector(`[data-page-id="${page.id}"]`) as HTMLElement;
					newParentCard?.focus();
					newParentCard?.click();
					requestAnimationFrame(() => {
						newCard?.focus();
						if (active) newCard?.click();
					});
				});
			} else if (event.altKey) {
				const newParent = addParentAbovePage(page.id);
				requestAnimationFrame(() => {
					const newParentCard = document.querySelector(`[data-page-id="${newParent?.id}"]`) as HTMLElement;
					const newCard = document.querySelector(`[data-page-id="${page.id}"]`) as HTMLElement;
					newParentCard?.focus();
					newParentCard?.click();
					requestAnimationFrame(() => {
						newCard?.focus();
						if (active) newCard?.click();
					});
				});
			} else {
				const connections = target.closest('.page')?.querySelector('.connections') as HTMLElement;
				const activeCard = connections?.querySelector('.page-card.active') as HTMLElement;
				const firstCard = connections?.querySelector('.page-card') as HTMLElement;
				const addCard = connections?.querySelector('.add-connection') as HTMLElement;
				const nextChild = activeCard || firstCard || addCard;
				if (nextChild) {
					nextChild?.focus();
				} else {
					activatePage(page.id);
				}
			}
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (event.shiftKey) {
				reorderPage(page.id, 'up');
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
				reorderPage(page.id, 'down');
				requestAnimationFrame(() => {
					target?.focus();
				});
			} else {
				nextNode?.focus();
			}
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			if (event.shiftKey) {
				movePageUp(page.id);
				requestAnimationFrame(() => {
					const newCard = document.querySelector(`[data-page-id="${page.id}"]`) as HTMLElement;
					newCard?.focus();
					if (active) newCard?.click();
				});
			} else if (event.altKey) {
				replaceEmptyParent(page.id);
				requestAnimationFrame(() => {
					const newCard = document.querySelector(`[data-page-id="${page.id}"]`) as HTMLElement;
					newCard?.focus();
					if (active) newCard?.click();
				});
			} else {
				const parentCard = document.querySelector(`[data-page-id="${parentId}"]`) as HTMLElement;
				parentCard?.focus();
			}
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			if (active) {
				deactivatePage(page.id);
			} else {
				target.click();
			}
		}

		// Space key
		if (event.key === ' ') {
			event.preventDefault();
			if (!active) {
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

	let expanded = !!page.active;

	function onTransitionEnd(event: TransitionEvent) {
		if (event.propertyName === 'height') {
			expanded = !!page.active;
		}
	}

	onMount(() => {
		card.addEventListener('transitionend', onTransitionEnd);
		return () => {
			card.removeEventListener('transitionend', onTransitionEnd);
		};
	});
</script>

<div
	class="page-card"
	class:active={page.active}
	class:focus={page.focus}
	{tabindex}
	on:click={onClick}
	on:keydown={onKeyDown}
	on:focus={onFocus}
	bind:this={card}
	data-page-id={page.id}
>
	<div class="page-card-content">
		<PageTitle {page} {tabindex} />
		<PageDescription {page} {tabindex} {expanded} />
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
		cursor: pointer;
		margin-right: 2px;

		&.active {
			box-shadow: 0 2px 4px 2px fade(black, 10%);
			padding-top: 4px;
		}

		&.focus,
		&:focus,
		&:focus-within,
		&:active {
			border-color: transparent;
			outline-style: solid;
			outline-width: 2px;
			outline-color: black;
		}

		// active page animation
		@transition-time: 0.2s;
		@transition-delay: 0s; // was 0.1s
		width: 80px;
		height: 40px;
		min-width: fit-content;
		min-height: fit-content;
		transition: height @transition-time ease-in-out, width @transition-time ease-in-out @transition-delay;
		&.active {
			--height: calc(var(--active-page-scale, 0.5) * 75vh);
			min-width: 150px;
			min-height: 60px;
			height: var(--height);
			max-height: var(--height);
			width: calc(var(--height) * var(--aspect-ratio));
			max-width: calc(var(--height) * var(--aspect-ratio));
			transition: height @transition-time ease-in-out @transition-delay, width @transition-time ease-in-out;
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
