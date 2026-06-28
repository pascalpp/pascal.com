<script lang="ts">
  import DivRenderer from './DivRenderer.svelte';
  import Column from '$lib/components/Column.svelte';
  import Slider from '$lib/components/Slider.svelte';
  import { onMount } from 'svelte';

  let iterations = 10000;
  let warningLimit = 1000000;
  let render = false;
  let renderingA = false;
  let renderingB = false;

  let step = 3;

  function exponentialStep(n: number) {
    return Math.pow(10, n) * 10;
  }

  $: iterations = exponentialStep(step);

  onMount(() => {
    render = true;
  });
</script>

<h3>Iterations: {iterations.toLocaleString()}</h3>
<p class="slider">
  <Slider min={1} max={7} step={1} bind:value={step} id="iterations" label="" />
</p>

{#if iterations >= warningLimit}
  <p class="warning">
    Warning: Rendering more than {warningLimit.toLocaleString()} divs may cause your browser to hang indefinitely.
  </p>
{/if}

<!-- <p>renderingA: {renderingA} — renderingB: {renderingB}</p> -->

<div class="grid">
  <Column>
    <DivRenderer {iterations} type="block" render={render && !renderingB} bind:rendering={renderingA} />
  </Column>
  <Column>
    <DivRenderer {iterations} type="flex" render={render && !renderingA} bind:rendering={renderingB} />
  </Column>
</div>

<style lang="less">
  .slider {
    max-width: 300px;
  }

  .grid {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .warning {
    font-style: italic;
  }
</style>
