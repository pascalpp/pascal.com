<script lang="ts">
  export let showVisibilityToggles = false;
  export let showVariables = false;

  export let showRed = true;
  export let showBlue = true;
  export let showGreen = true;

  export let border1 = 20;
  export let border2 = 35;
  export let border3 = 15;
  export let border4 = 5;

  export let corner1 = 45;
  export let corner2 = 40;
  export let corner3 = 50;
  export let corner4 = 40;

  export let size = 300;
  export let offset = 60;
  export let blur = 3;

  let showControls = showVisibilityToggles || showVariables;
  let id = crypto.randomUUID();
</script>

<figure>
  <div
    class="fuzzy-spinner"
    style="
      --size: {size}px; --blur: {blur}px; --offset: {offset}deg;
      --border1: {border1}px; --border2: {border2}px; --border3: {border3}px; --border4: {border4}px;
      --corner1: {corner1}%; --corner2: {corner2}%; --corner3: {corner3}%; --corner4: {corner4}%;
    "
  >
    <div class="spinner red" class:show={showRed} class:blur={blur > 0} />
    <div class="spinner blue" class:show={showBlue} class:blur={blur > 0} />
    <div class="spinner green" class:show={showGreen} class:blur={blur > 0} />
  </div>
</figure>

{#if showControls}
  <div class="controls">
    {#if showVisibilityToggles}
      <div class="toggles">
        <span>Show</span>
        <label class="toggle" for="red-checkbox-{id}">
          <input id="red-checkbox-{id}" type="checkbox" bind:checked={showRed} /> Red
        </label>
        <label class="toggle" for="blue-checkbox-{id}">
          <input id="blue-checkbox-{id}" type="checkbox" bind:checked={showBlue} /> Blue
        </label>
        <label class="toggle" for="green-checkbox-{id}">
          <input id="green-checkbox-{id}" type="checkbox" bind:checked={showGreen} /> Green
        </label>
      </div>
    {/if}

    {#if showVariables}
      <div class="variables sliders">
        <div class="slider">
          <span>Border 1</span>
          <input type="range" bind:value={border1} />
          <span>{border1}px</span>
        </div>
        <div class="slider">
          <span>Border 2</span>
          <input type="range" bind:value={border2} />
          <span>{border2}px</span>
        </div>
        <div class="slider">
          <span>Border 3</span>
          <input type="range" bind:value={border3} />
          <span>{border3}px</span>
        </div>
        <div class="slider">
          <span>Border 4</span>
          <input type="range" bind:value={border4} />
          <span>{border4}px</span>
        </div>
      </div>

      <div class="variables sliders">
        <div class="slider">
          <span>Corner 1</span>
          <input type="range" bind:value={corner1} />
          <span>{corner1}%</span>
        </div>
        <div class="slider">
          <span>Corner 2</span>
          <input type="range" bind:value={corner2} />
          <span>{corner2}%</span>
        </div>
        <div class="slider">
          <span>Corner 3</span>
          <input type="range" bind:value={corner3} />
          <span>{corner3}%</span>
        </div>
        <div class="slider">
          <span>Corner 4</span>
          <input type="range" bind:value={corner4} />
          <span>{corner4}%</span>
        </div>
      </div>

      <div class="variables sliders">
        <div class="slider">
          <span>Size</span>
          <input type="range" bind:value={size} min={50} max={400} />
          <span>{size}px</span>
        </div>
        <div class="slider">
          <span>Offset</span>
          <input type="range" bind:value={offset} min={0} max={360} />
          <span>{offset}deg</span>
        </div>
        <div class="slider">
          <span>Blur</span>
          <input type="range" bind:value={blur} min={0} max={20} />
          <span>{blur}px</span>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style lang="less">
  figure {
    grid-column: content;
    place-content: center;
    height: 400px;
  }

  .controls {
    grid-column: content-end / full-width-end;
    place-content: center;
    align-self: stretch;
    font-family: var(--sans-font);
    gap: 1rem;
    display: grid;
    grid-template-columns: min-content auto 80px;
  }
  @container (inline-size < 1200px) {
    .controls {
      grid-column: content;
    }
  }

  .toggles {
    grid-column: 1 / 4;
    display: flex;
    gap: 1em;
    font-size: 14px;
  }

  .toggle {
    display: flex;
    gap: 0.25em;
    align-items: center;
    user-select: none;
    grid-column: 1 / 4;
    white-space: nowrap;
  }

  .sliders {
    display: grid;
    grid-template-columns: subgrid;
    width: min-content;
    font-size: 14px;
    white-space: nowrap;
    grid-column: 1 / 4;
    gap: 0.1rem;
  }

  .slider {
    display: grid;
    grid-template-columns: subgrid;
    gap: 1em;
    grid-column: 1 / 4;
  }

  .fuzzy-spinner {
    width: var(--size);
    aspect-ratio: 1;
    position: relative;
  }

  .spinner {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    animation: spin 9s linear infinite;
    transition: border-width 0.5s;
    --min-scale: 0.85;
    --max-scale: 1;
    visibility: hidden;

    &.show {
      visibility: visible;
    }

    &.red {
      color: red;
      --min-opacity: 0.8;
      --max-opacity: 1;
      animation-delay: -9s;
    }
    &.blue {
      color: blue;
      --min-opacity: 0.3;
      --max-opacity: 0.9;
      &::before {
        transform: rotate(var(--offset));
        animation-delay: -6s;
      }
    }
    &.green {
      color: green;
      --min-opacity: 0.3;
      --max-opacity: 0.7;
      &::before {
        transform: rotate(calc(var(--offset) * 2));
        animation-delay: -3s;
      }
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      inset: 25%;
      width: 50%;
      height: 50%;
      border: 10px solid currentColor;
      position: relative;
      border-radius: var(--corner1) var(--corner2) var(--corner3) var(--corner4);
      animation: wobble 2s ease-in-out infinite;
      background-color: white;
      filter: drop-shadow(0 0 20px color-mix(in srgb, currentColor 50%, transparent)) blur(var(--blur));
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  @keyframes wobble {
    0% {
      border-width: var(--border1) var(--border2) var(--border3) var(--border4);
      opacity: var(--max-opacity);
      scale: var(--min-scale);
    }
    25% {
      border-width: var(--border4) var(--border1) var(--border2) var(--border3);
    }
    50% {
      border-width: var(--border3) var(--border4) var(--border1) var(--border2);
      opacity: var(--min-opacity);
      scale: var(--max-scale);
    }
    75% {
      border-width: var(--border2) var(--border3) var(--border4) var(--border1);
    }
    100% {
      border-width: var(--border1) var(--border2) var(--border3) var(--border4);
      opacity: var(--max-opacity);
      scale: var(--min-scale);
    }
  }
</style>
