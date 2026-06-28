<script lang="ts">
  import PageCard from './PageCard.svelte';
  import PageConnections from './PageConnections.svelte';
  import type { Page, PageId } from './pages.store';
  import { pageStore } from './pages.store';
  import { settings } from './settings.store';

  export let pageId: PageId;
  export let parentId: PageId | undefined = undefined;
  export let previousSiblingId: PageId | undefined = undefined;
  export let nextSiblingId: PageId | undefined = undefined;
  export let taborder = 0;

  let page: Page;

  pageStore.subscribe((pages) => {
    page = pages.find((p) => p.id === pageId) as Page;
  });
</script>

{#if page}
  {#key page?.id}
    <div class="page" class:active={page.active} data-flow-alignment={$settings.flowAlignment}>
      {#if parentId}
        <PageCard {page} {taborder} {parentId} {previousSiblingId} {nextSiblingId} />
      {/if}
      <PageConnections {page} {taborder} {parentId} />
    </div>
  {/key}
{/if}

<style lang="less">
  .page {
    display: flex;
    flex-direction: row;
    position: relative;
    pointer-events: none;

    &[data-flow-alignment='top'] {
      align-items: flex-start;
    }
    &[data-flow-alignment='center'] {
      align-items: center;
    }
  }
</style>
