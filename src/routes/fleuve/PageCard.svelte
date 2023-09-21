<script lang="ts">
	import { onMount } from 'svelte';
	import PageDescription from './PageDescription.svelte';
	import PageTitle from './PageTitle.svelte';
	import type { Page, PageId } from './pages.store';
	import {
		activatePage,
		removePage,
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
			}
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			if (event.shiftKey) {
				const newParent = movePageDown(page.id);
				if (active) {
					activatePage(newParent.id);
					activatePage(page.id);
				}
				requestAnimationFrame(() => {
					const newCard = document.querySelector(`[data-page-id="${page.id}"]`) as HTMLElement;
					newCard?.focus();
				});
			} else if (event.altKey) {
				const newParent = addParentAbovePage(page.id);
				requestAnimationFrame(() => {
					activatePage(newParent.id);
					if (active) {
						activatePage(page.id);
					}
					requestAnimationFrame(() => {
						const newCard = document.querySelector(`[data-page-id="${page.id}"]`) as HTMLElement;
						newCard?.focus();
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
			if (active) {
				deactivatePage(page.id);
			} else {
				target.click();
			}
		}

		if (event.key === 'Backspace') {
			event.preventDefault();
			const confirmed = confirm('Are you sure you want to remove this card and all of its connections?');
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
		pointer-events: auto;

		&.active {
			box-shadow: 0 2px 4px 2px fade(black, 10%);
		}

		&.focus,
		&:focus,
		&:focus-within,
		&:active {
			border-color: var(--card-title-bgcolor);
			outline-style: solid;
			outline-width: 2px;
			outline-color: black;
		}

		// active page animation
		@width-transition-time: 0.1s;
		@width-transition-delay: 0.2s;
		@height-transition-time: 0.2s;
		@height-transition-delay: 0.1s;
		min-width: var(--card-min-width);
		max-width: var(--card-max-width);
		min-height: var(--card-min-height);
		transition: min-width @width-transition-time ease-in-out @width-transition-delay,
			max-width @width-transition-time ease-in-out @width-transition-delay,
			min-height @height-transition-time ease-in-out, max-height @height-transition-time ease-in-out;
		&.active {
			--width: calc(var(--card-max-width) * var(--active-page-scale, 1));
			--height: calc(var(--width) / var(--aspect-ratio));
			min-height: var(--height);
			max-height: var(--height);
			min-width: var(--width);
			max-width: var(--width);
			transition: min-width @width-transition-time ease-in-out, max-width @width-transition-time ease-in-out,
				min-height @height-transition-time ease-in-out @height-transition-delay,
				max-height @height-transition-time ease-in-out @height-transition-delay;
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
