<script lang="ts">
  import { tick } from 'svelte';
  import ColorGrid from './ColorGrid.svelte';

  const palette = [
    '#e6194b',
    '#3cb44b',
    '#ffe119',
    '#4363d8',
    '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#bcf60c',
  ] as const;

  const minColors = 3;
  const maxColors = 9;

  let colors: string[] = [...palette];
  let viewTransitionsActive = false;

  function shuffle<T>(items: T[]): T[] {
    const next = [...items];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  }

  function randomColorSet(): string[] {
    const count = minColors + Math.floor(Math.random() * (maxColors - minColors + 1));
    return shuffle([...palette]).slice(0, count);
  }

  async function randomize() {
    const next = randomColorSet();

    if (!document.startViewTransition) {
      colors = next;
      return;
    }

    viewTransitionsActive = true;
    await tick();

    await document.startViewTransition(async () => {
      colors = next;
      await tick();
    }).finished;

    viewTransitionsActive = false;
  }
</script>

<div class="demo">
  <button type="button" class="randomize" on:click={randomize}>Shuffle Colors</button>
  <ColorGrid {colors} {viewTransitionsActive} transitionName="shuffle-square2" />
</div>

<style lang="less">
  .demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: min-content;
    margin-block: 1rem;
  }

  .randomize {
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }
</style>
