<script lang="ts">
	import { focusPreviousElement } from './focusHelpers';
	import type { Page } from './pages.store';
	import { updatePage } from './pages.store';
	import { settings } from './settings.store';

	export let page: Page;
	export let taborder: number;

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
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key !== 'Tab') {
			event.stopPropagation();
		}

		if (['Escape'].includes(event.key)) {
			event.stopPropagation();
			event.preventDefault();
			focusPreviousElement();
		}
		if (['Enter'].includes(event.key)) {
			event.stopPropagation();
			event.preventDefault();
			focusPreviousElement();
		}
	}
</script>

<div class="title" class:active={page.active} class:fill={!$settings.showDescription}>
	<div
		class="editor"
		role="textbox"
		aria-multiline="true"
		class:active={page.active}
		contenteditable={page.active && page.focus}
		tabindex={page.active && page.focus ? taborder : -1}
		on:click={onClick}
		on:focus={onFocus}
		on:blur={onBlur}
		on:keydown={onKeyDown}
		data-testid="Title Editor"
	>
		{page.title}
	</div>
</div>

<style lang="less">
	.title {
		background-color: var(--card-title-bgcolor);
		font-size: 16px;
		line-height: 1.5;
		font-weight: bold;
		transition: font-size var(--card-animation-speed) ease-in-out;
		pointer-events: none;
		flex-shrink: 0;
		padding: 4px;
		&.fill {
			flex-grow: 1;
		}

		&.active {
			pointer-events: auto;
			font-size: 20px;
		}

		.editor {
			width: 100%;
			display: block;
			appearance: none;
			background-color: transparent;
			border: none;
			resize: none;
			padding: 0;
			margin: 0;
			text-align: left;
			padding: 4px 12px;

			&:focus {
				outline-style: auto;
				outline-width: 2px;
				outline-color: blue;
				outline-offset: -3px;
			}
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
			.editor {
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
