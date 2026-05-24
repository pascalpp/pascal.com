<script lang="ts">
  export let colors: string[];
  export let transitionName: string;
  export let viewTransitionsActive = false;

  const transitionClass = 'color-grid-scale';

  function swatchTransitionName(color: string) {
    return `${transitionName}-${color.slice(1)}`;
  }
</script>

<div class="grid">
  {#each colors as color (color)}
    <div
      class="square"
      style:background-color={color}
      style:view-transition-name={viewTransitionsActive ? swatchTransitionName(color) : 'none'}
      style:view-transition-class={transitionClass}
    />
  {/each}
</div>

<style lang="less">
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    width: 50vh;
  }

  .square {
    aspect-ratio: 1;
    border-radius: 0.5rem;
    border: 1px solid rgba(0 0 0 / 0.3);
  }

  @keyframes shuffle-scale {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(2);
    }
  }

  :global(::view-transition-group(.color-grid-scale)) {
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
  }

  :global(::view-transition-image-pair(.color-grid-scale)) {
    animation: 0.5s ease-in-out shuffle-scale;
  }
</style>
