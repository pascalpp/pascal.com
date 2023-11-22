<script lang="ts">
  import Swatch from './Swatch.svelte';

  export let swatches = new Array(64).fill(null);

  let showLetters = false;
</script>

<div class="swatch-grid">
  {#each swatches as _}
    <Swatch {showLetters} />
  {/each}
</div>

<style lang="less">
  .swatch-grid {
    touch-action: none;
    margin-block: 1rem;
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: 1fr;
    user-select: none;
  }
</style>
