<script lang="ts">
	import { focusNextElement, focusPreviousElement } from './focusHelpers';
	import type { Page } from './pages.store';
	import { updatePage } from './pages.store';
	import { settings } from './settings.store';

	export let page: Page;
	export let tabindex: number;

	function onClick(event: MouseEvent) {
		if (!page.active) return;
		const target = event.target as HTMLElement;
		target.focus();
		requestAnimationFrame(() => selectTarget(target));
	}

	function onFocus(event: FocusEvent) {
		if (!page.active) return;
		const target = event.target as HTMLHeadingElement;
		selectTarget(target);
	}

	function selectTarget(target: HTMLElement) {
		if (window.getSelection && document.createRange) {
			const range = document.createRange();
			range.selectNodeContents(target);
			const selection = window.getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}

	function onBlur(event: FocusEvent) {
		const target = event.target as HTMLHeadingElement;
		target.scrollTo({ top: 0 });
		const title = target.innerText.trim();
		if (!title) target.innerText = title;
		updatePage({ ...page, title });
		const selection = window.getSelection();
		selection?.removeAllRanges();
		// const parentCard = target.closest('.page-card') as HTMLElement;
		// parentCard?.focus();
	}

	function onKeyDown(event: KeyboardEvent) {
		if (['Escape'].includes(event.key)) {
			event.stopPropagation();
			event.preventDefault();
			focusPreviousElement();
		}
		if (['Enter'].includes(event.key)) {
			event.stopPropagation();
			event.preventDefault();
			focusNextElement();
		}
	}
</script>

<div class="title" class:active={page.active} class:fill={!$settings.showDescription}>
	<h1
		class:active={page.active}
		contenteditable={true}
		tabindex={page.active && page.focus ? tabindex : -1}
		on:click={onClick}
		on:focus={onFocus}
		on:blur={onBlur}
		on:keydown={onKeyDown}
	>
		{page.title}
	</h1>
</div>

<style lang="less">
	.title {
		background-color: var(--card-title-bgcolor);
		font-size: 16px;
		padding: 8px 16px;
		line-height: 1.5;
		transition: font-size var(--card-animation-speed) ease-in-out;
		overflow: hidden;
		pointer-events: none;
		flex-shrink: 0;
		&.fill {
			flex-grow: 1;
		}

		&.active {
			pointer-events: auto;
			font-size: 20px;
		}
		&:focus-within {
			outline-style: auto;
			outline-width: 2px;
			outline-color: blue;
			outline-offset: -8px;
		}

		h1 {
			font-size: inherit;
			outline: none;

			// limit title to 6 lines
			&:not(:focus) {
				overflow: hidden;
				.line-clamp(6);
			}
			&:focus {
				overflow-y: scroll;
				max-height: 1.5em * 6;
			}

			&:empty::before {
				content: var(--title-placeholder);
				opacity: 0.3;
			}
		}

		&:not(.fill) {
			// limit title to 3 lines
			h1 {
				&:not(:focus) {
					overflow: hidden;
					.line-clamp(3);
				}
				&:focus {
					overflow-y: scroll;
					max-height: 1.5em * 3;
				}
			}
		}
	}
</style>
