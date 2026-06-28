<script lang="ts">
  import { focusCard } from './focusHelpers';
  import { pageStore, loadTutorial, activatePage } from './pages.store';
  import { onMount } from 'svelte';

  let isShowingTutorial = false;

  function onClickTutorial() {
    const tutorialStartPageId = loadTutorial();
    if (!tutorialStartPageId) return;
    requestAnimationFrame(() => {
      activatePage(tutorialStartPageId);
      focusCard(tutorialStartPageId);
    });
  }

  onMount(() => {
    pageStore.subscribe((pages) => {
      const root = pages.find((item) => item.id === 'root');
      isShowingTutorial = !!root?.connections.some((pageId) => pageId === 'tutorial-start-page');
    });
  });
</script>

{#if !isShowingTutorial}
  <p>
    <button type="button" class="tutorial-button" on:click={onClickTutorial}>Show Tutorial</button>
  </p>
{/if}
