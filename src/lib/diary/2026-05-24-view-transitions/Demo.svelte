<script lang="ts">
  import { tick } from 'svelte';

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

  let colors: string[] = [...palette];

  function shuffle<T>(items: T[]): T[] {
    const next = [...items];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  }

  function transitionName(color: string) {
    return `square-${color.slice(1)}`;
  }

  async function randomize() {
    const next = shuffle(colors);

    if (!document.startViewTransition) {
      colors = next;
      return;
    }

    document.startViewTransition(async () => {
      colors = next;
      await tick();
    });
  }
</script>

<div class="demo">
  <button type="button" class="randomize" on:click={randomize}>Shuffle Colors</button>
  <div class="grid">
    {#each colors as color (color)}
      <div class="square" style:background-color={color} style:view-transition-name={transitionName(color)} />
    {/each}
  </div>
</div>

<style lang="less">
  .demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    width: 50vh;
  }

  .square {
    view-transition-class: shuffle-square;
    aspect-ratio: 1;
    border-radius: 0.5rem;
    border: 1px solid rgba(0 0 0 / 0.3);
  }

  .randomize {
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }

  :global(::view-transition-group(.shuffle-square)) {
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
  }
</style>
