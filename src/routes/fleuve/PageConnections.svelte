<script lang="ts">
  import type { Page, PageId } from './pages.store';
  import PageView from './PageView.svelte';
  import AddPageCard from './AddPageCard.svelte';
  import PageConnectionSummary from './PageConnectionSummary.svelte';
  import { settings } from './settings.store';
  import Leaf from './Leaf.svelte';

  export let page: Page;
  export let parentId: PageId | undefined = undefined;
  export let taborder: number;

  $: connections = page.connections;
  $: opacity = $settings.childOpacity;
  $: showLeftBorder = (page.active && page.connections.length > 0) || (opacity > 0 && page.connections.length > 1);
</script>

<div
  class="connections"
  class:active={page.active || opacity === 0}
  class:show-left-border={showLeftBorder}
  class:root={!parentId}
  data-flow-alignment={$settings.flowAlignment}
>
  {#if page.active || opacity > 0}
    {#each connections as connectionId, index (connectionId)}
      <Leaf id={`leaf-page-${page.id}`} parentId={page.id}>
        <PageView
          pageId={connectionId}
          {taborder}
          parentId={page.id}
          previousSiblingId={connections[index - 1]}
          nextSiblingId={connections[index + 1]}
        />
      </Leaf>
    {/each}
    {#if page.active}
      <Leaf id={`leaf-addcard-${page.id}`} parentId={page.id}>
        <AddPageCard {page} {taborder} parentId={page.id} siblingId={connections[connections.length - 1]} />
      </Leaf>
    {/if}
  {:else if connections.length}
    <Leaf id={`leaf-more-${page.id}`} parentId={page.id}>
      <PageConnectionSummary {page} {taborder} />
    </Leaf>
  {/if}
</div>

<style lang="less">
  .connections {
    transform: translateX(-2px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    gap: 16px;
    &.root {
      gap: 120px;
    }

    opacity: var(--child-opacity, 0.5);
    transition: opacity var(--card-animation-speed) ease-in-out;
    &.active,
    &:focus-within {
      opacity: 1;
    }

    // conditional placeholder vars
    // root-level
    --title-placeholder: 'Untitled flow';
    --add-card-placeholder: 'Add new flow';
    &:not(:first-child) {
      // child-level with no active siblings
      --title-placeholder: 'Untitled card';
      --add-card-placeholder: 'Add card';
      &:has(.page.active) {
        // child-level with active siblings
        --add-card-placeholder: 'Add sibilng';
      }
    }

    &:not(.root) {
      @top-offset: 22px;
      @left-offset: 24px;
      @active-left-offset: 12px;
      width: max-content;

      // rules on the connections box
      &.show-left-border {
        // background-color: fade(red, 10%);
        margin-left: @left-offset;
        position: relative;
        // left stem
        &::before {
          position: absolute;
          display: block;
          content: '';
          height: 1px;
          width: @left-offset;
          border-bottom: 1px solid black;
          top: @top-offset;
          right: 100%;
          z-index: 2;
        }
        &[data-flow-alignment='center']::before {
          top: 50%;
        }
        // left border
        &::after {
          position: absolute;
          display: block;
          content: '';
          width: 1px;
          border-left: 1px solid black;
          top: @top-offset;
          bottom: 0;
        }
        &[data-flow-alignment='center']::after {
          top: 0;
        }
      }

      // left stem on each child
      :global(> *) {
        margin-left: @left-offset;
        position: relative;
        &::before {
          position: absolute;
          display: block;
          content: '';
          height: 1px;
          width: @left-offset;
          border-bottom: 1px solid black;
          top: @top-offset;
          right: 100%;
        }
      }
      &[data-flow-alignment='center'] :global(> *)::before {
        top: 50%;
      }

      // special rounded stem on the last child
      // but only if there are children above it
      :global(> :last-child:not(:first-child)) {
        &::before {
          position: absolute;
          display: block;
          content: '';
          width: @left-offset;
          border: none;
          background-color: transparent;
          border-left: 1px solid black;
          border-bottom: 1px solid black;
          border-bottom-left-radius: 4px;
          top: unset;
          height: @top-offset + 16px;
          bottom: calc(100% - @top-offset - 16px);
          right: 100%;
          z-index: 2;
        }
        // box to paint over bottom of .connections left border
        &::after {
          z-index: 1;
          background-color: #f3f3f3; // needs to match background color
          // background-color: red; // for testing
          position: absolute;
          display: block;
          content: '';
          width: @left-offset;
          border: none;
          height: 100%;
          bottom: 0;
          right: calc(100% + (@left-offset / 2));
        }
      }

      &[data-flow-alignment='center'] {
        // special rounded stem on the first child in the center-aligned layout,
        // but only if there are children below it
        :global(> :first-child:not(:last-child)) {
          &::before {
            position: absolute;
            display: block;
            content: '';
            width: @left-offset;
            border: none;
            background-color: transparent;
            border-left: 1px solid black;
            border-top: 1px solid black;
            border-top-left-radius: 4px;
            height: 50%;
            top: 50%;
            right: 100%;
            z-index: 2;
          }
          // box to paint over bottom of .connections left border
          &::after {
            z-index: 1;
            background-color: #f3f3f3; // needs to match background color
            // background-color: red; // needs to match background color
            position: absolute;
            display: block;
            content: '';
            width: @left-offset;
            border: none;
            height: 100%;
            bottom: 0;
            right: calc(100% + (@left-offset / 2));
          }
        }
      }
    }
  }
</style>
