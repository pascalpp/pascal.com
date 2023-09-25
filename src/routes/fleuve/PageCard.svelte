<script lang="ts">
  import PageDescription from './PageDescription.svelte';
  import PageTitle from './PageTitle.svelte';
  import type { Page, PageId } from './pages.store';
  import { focusCard } from './focusHelpers';
  import { activatePage, setPageFocus, unsetPageFocus } from './pages.store';
  import getCardKeyHandler from './getCardKeyHandler';

  export let page: Page;
  export let parentId: PageId;
  export let previousSiblingId: PageId | undefined = undefined;
  export let nextSiblingId: PageId | undefined = undefined;
  export let taborder = 0;

  $: firstChildId = page.connections[0];
  $: cardKeyHandler = getCardKeyHandler({
    pageId: page.id,
    active: page.active,
    parentId,
    previousSiblingId,
    nextSiblingId,
    firstChildId,
  });

  const editDescription = `#edit-description-${page.id}`;

  function onClick(event: MouseEvent) {
    event.preventDefault();
    activatePage(page.id);
  }

  function onFocusIn() {
    setPageFocus(page.id);
  }
  function onFocusOut() {
    unsetPageFocus(page.id);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (['d', 'e'].includes(event.key.toLowerCase())) {
      event.preventDefault();
      if (page.active) {
        const editButton = document.querySelector(editDescription) as HTMLButtonElement;
        editButton?.click();
      }
    }

    cardKeyHandler(event);
  }

  function onTransitionEnd(event: TransitionEvent) {
    if (event.propertyName === 'min-width' && page.focus) {
      focusCard(page.id);
    }
  }
</script>

<div
  class="page-card"
  class:active={page.active}
  class:focus={page.focus}
  on:click={onClick}
  on:keydown={onKeyDown}
  on:focusin={onFocusIn}
  on:focusout={onFocusOut}
  on:transitionend={onTransitionEnd}
  role="button"
  tabindex={taborder}
  id={`card-${page.id}`}
  data-testid={page.title || 'Untitled card'}
>
  <div class="page-card-content">
    <PageTitle {page} {taborder} />
    <PageDescription {page} {taborder} />
  </div>
  <!-- <button class="focus-bottom-target" tabindex={page.active && page.focus ? tabindex : -1} on:keydown={onKeyDown} /> -->
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
    overflow: hidden;

    &.active {
      box-shadow: 0 2px 4px 2px fade(black, 10%);
    }

    &:focus,
    &:focus-within,
    &:active {
      border-color: var(--card-title-bgcolor);
      outline-style: solid;
      outline-width: 2px;
      outline-color: black;
    }

    // active page animation
    @width-transition-time: calc(var(--card-animation-speed) * 2);
    @width-transition-delay: var(--card-animation-speed);
    @height-transition-time: var(--card-animation-speed);
    @height-transition-delay: calc(var(--card-animation-speed) * 2);

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
      max-height: var(--height);
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
