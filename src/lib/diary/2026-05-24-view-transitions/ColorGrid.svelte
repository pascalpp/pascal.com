<script lang="ts">
  export let colors: string[];
  export let transitionName: string;

  function swatchTransitionName(color: string) {
    return `${transitionName}-${color.slice(1)}`;
  }
</script>

<div class="grid">
  {#each colors as color (color)}
    <div
      class="square"
      style:background-color={color}
      style:view-transition-name={swatchTransitionName(color)}
      style:view-transition-class={transitionName}
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

  :global(::view-transition-group(*)) {
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
  }
</style>
