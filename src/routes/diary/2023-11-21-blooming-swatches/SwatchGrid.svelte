<script lang="ts" context="module">
  type SwatchColors = {
    color: string;
    hovercolor: string;
  };
</script>

<script lang="ts">
  import Swatch from './Swatch.svelte';
  import randomHexColor from './randomColor';

  export let swatches: SwatchColors[] = new Array(100).fill(null).map((_, i) => ({
    color: randomHexColor(),
    hovercolor: randomHexColor(),
  }));
</script>

<div class="swatch-grid">
  {#each swatches as { color, hovercolor }}
    <Swatch {color} {hovercolor} />
  {/each}
</div>

<style lang="less">
  .swatch-grid {
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows: 1fr;
  }
</style>
