<script lang="ts">
  import { slide } from 'svelte/transition';
  import PageDescription from './PageDescription.svelte';
  import PageTitle from './PageTitle.svelte';
  import type { Page, PageId } from './pages.store';
  import { focusAddCard, focusNextElement, focusCard as focusCard } from './focusHelpers';
  import {
    activatePage,
    removePage,
    reorderPage,
    movePageUp,
    movePageDown,
    addParentAbovePage,
    replaceEmptyParent,
    setPageFocus,
    unsetPageFocus,
    deactivatePage,
  } from './pages.store';

  export let page: Page;
  export let parentId: PageId;
  export let previousSiblingId: PageId | undefined = undefined;
  export let nextSiblingId: PageId | undefined = undefined;
  export let taborder = 0;

  $: firstChildId = page.connections[0];

  let card: HTMLDivElement;

  const tutorialId = 'tutorial-start-page';
  const deleteConfirmation = 'Are you sure you want to remove this card and all of its connections?';
  const deleteTutorialConfimation = 'You’re about to delete this tutorial. You can restore it in the settings menu.';

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
    const target = event.target as HTMLElement;
    const active = page.active;

    if (['d', 'e'].includes(event.key.toLowerCase())) {
      if (page.active) {
        const editButton = card?.querySelector('.description .edit-button') as HTMLButtonElement;
        editButton?.click();
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
          focusCard(page.id);
        });
      } else if (event.altKey) {
        const newParent = addParentAbovePage(page.id);
        requestAnimationFrame(() => {
          activatePage(newParent.id);
          if (active) {
            activatePage(page.id);
          }
          requestAnimationFrame(() => {
            focusCard(page.id);
          });
        });
      } else {
        focusCard(firstChildId) || focusAddCard(page.id) || activatePage(page.id);
      }
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (event.shiftKey) {
        reorderPage(page.id, 'up');
        requestAnimationFrame(() => {
          focusCard(page.id);
        });
      } else {
        focusCard(previousSiblingId);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (event.shiftKey) {
        reorderPage(page.id, 'down');
        requestAnimationFrame(() => {
          focusCard(page.id);
        });
      } else {
        focusCard(nextSiblingId) || focusAddCard(parentId);
      }
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (event.shiftKey) {
        movePageUp(page.id);
        requestAnimationFrame(() => {
          const el = focusCard(page.id);
          if (active) el?.click();
        });
      } else if (event.altKey) {
        replaceEmptyParent(page.id);
        requestAnimationFrame(() => {
          const el = focusCard(page.id);
          if (active) el?.click();
        });
      } else {
        focusCard(parentId);
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

    if (event.key === 'Escape') {
      if (active) {
        event.preventDefault();
        deactivatePage(page.id);
      } else {
        focusCard(parentId);
      }
    }

    if (['Backspace', 'Delete'].includes(event.key)) {
      event.preventDefault();
      const isTutorial = page.id === tutorialId;
      const message = isTutorial ? deleteTutorialConfimation : deleteConfirmation;
      const confirmed = confirm(message);
      if (confirmed) {
        removePage(page.id);
        focusCard(nextSiblingId) || focusCard(previousSiblingId) || focusNextElement();
      }
    }
  }

  function onTransitionEnd(event: TransitionEvent) {
    if (event.propertyName === 'min-width' && page.focus) {
      focusCard(page.id);
    }
  }
</script>

<div
  transition:slide
  class="page-card"
  class:active={page.active}
  class:focus={page.focus}
  on:click={onClick}
  on:keydown={onKeyDown}
  on:focusin={onFocusIn}
  on:focusout={onFocusOut}
  on:transitionend={onTransitionEnd}
  bind:this={card}
  role="button"
  tabindex={taborder}
  id={`card-${page.id}`}
  data-testid={page.title || 'Untitled card'}
>
  <div class="page-card-content">
    <PageTitle {page} {taborder} />
    <PageDescription {page} {taborder} {parentId} {previousSiblingId} {nextSiblingId} {firstChildId} />
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
