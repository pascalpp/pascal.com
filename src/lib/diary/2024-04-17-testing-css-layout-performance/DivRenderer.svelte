<script lang="ts">
  import ToggleSwitch from '$lib/components/ToggleSwitch.svelte';

  export let iterations = 10000;
  export let type: 'block' | 'flex' = 'block';
  export let render = false;
  export let rendering = false;

  let lastRun: number | null = null;

  let start: number;
  let end: number;
  let parent: HTMLDivElement;
  let status = 'Idle.';
  let toggleValue = 'true';
  let enabled = true;
  let perf: PerformanceMeasure;

  function renderDivBlocks(n: number) {
    if (!render) {
      rendering = false;
      return;
    }
    rendering = true;
    reset();
    lastRun = n;
    status = 'Rendering…';
    start = performance.now();
    setTimeout(() => {
      for (let i = 0; i < n; i++) {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = `div.${type} ${i}`;
        div.appendChild(p);
        parent.appendChild(div);
      }
      end = performance.now();
      perf = performance.measure(type, { start, end });
      status = `Rendered ${n.toLocaleString()} ${type} divs in ${formatTime(perf.duration)}ms.`;
      rendering = false;
    }, 10);
  }

  function formatTime(time: number): string {
    return Number(time.toFixed(3)).toLocaleString();
  }

  function reset() {
    status = 'Idle.';
    lastRun = null;
    parent.innerHTML = '';
  }

  $: if (enabled && render && lastRun !== iterations) {
    status = 'Waiting to render…';
    setTimeout(() => {
      if (render) {
        rendering = true;
        setTimeout(() => {
          requestAnimationFrame(() => renderDivBlocks(iterations));
        }, 10);
      } else {
        rendering = false;
      }
    }, 100);
  }

  function setToggleValue() {
    toggleValue = toggleValue === 'true' ? 'false' : 'true';
  }
  $: enabled = toggleValue === 'true';

  $: if (!enabled) {
    reset();
  }
</script>

<button class="enabled" on:click={setToggleValue}>
  <span>
    <ToggleSwitch value={toggleValue} label="enabled" id="enabled" name="enabled" />
  </span>

  {#if type === 'flex'}
    <h3>display: flex</h3>
  {:else}
    <h3>display: block</h3>
  {/if}
</button>

<!-- <p>Render: {render}</p> -->
<p>{status}</p>

<div class="parent {type}" bind:this={parent} />

<style lang="less">
  button.enabled {
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0;
    box-shadow: none;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 1rem;
    font-size: 10px;
    cursor: pointer;
  }

  .parent {
    &:empty {
      display: none;
    }
    border: 1px solid rgb(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: white;
    display: block;
    padding: 1rem;

    &.block :global(div) {
      display: block;
    }
    &.flex :global(div) {
      display: flex;
      flex-direction: column;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
</style>
