<script lang="ts">
  import Swatch from './Swatch.svelte';

  export let swatches = new Array(100).fill(null);

  let showLetters = false;
</script>

<div class="swatch-grid">
  {#each swatches as _}
    <Swatch {showLetters} />
  {/each}
</div>

<style lang="less">
  .swatch-grid {
    margin-block: 1rem;
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows: 1fr;
  }
</style>
