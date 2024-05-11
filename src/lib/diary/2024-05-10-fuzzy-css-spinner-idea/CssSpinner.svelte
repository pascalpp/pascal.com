<script lang="ts">
  export let showVisibilityToggles = false;
  export let showVariables = false;

  export let red = true;
  export let blue = true;
  export let green = true;

  export let border1 = 20;
  export let border2 = 35;
  export let border3 = 15;
  export let border4 = 5;

  export let corner1 = 45;
  export let corner2 = 40;
  export let corner3 = 50;
  export let corner4 = 40;

  export let size = 300;
  export let rotate = 60;
  export let translate = 10;
  export let blur = 3;
  export let speed = 15;
  export let delay = 5;

  let showControls = showVisibilityToggles || showVariables;
  let id = crypto.randomUUID();
</script>

<figure>
  <div
    class="fuzzy-spinner"
    style="
      --size: {size}px; --translate: {translate}px; --rotate: {rotate}deg;
      --blur: {blur}px; --speed: {speed}s; --delay: {delay}s;
      --border1: {border1}px; --border2: {border2}px; --border3: {border3}px; --border4: {border4}px;
      --corner1: {corner1}%; --corner2: {corner2}%; --corner3: {corner3}%; --corner4: {corner4}%;
    "
  >
    <div class="spinner red" class:show={red} class:blur={blur > 0} />
    <div class="spinner blue" class:show={blue} class:blur={blur > 0} />
    <div class="spinner green" class:show={green} class:blur={blur > 0} />
  </div>
</figure>

{#if showControls}
  <details class="controls" open>
    <summary>Controls</summary>
    <div class="controls-grid">
      {#if showVisibilityToggles}
        <div class="toggles">
          <span>Show</span>
          <label class="toggle" for="red-checkbox-{id}">
            <input id="red-checkbox-{id}" type="checkbox" bind:checked={red} /> Red
          </label>
          <label class="toggle" for="blue-checkbox-{id}">
            <input id="blue-checkbox-{id}" type="checkbox" bind:checked={blue} /> Blue
          </label>
          <label class="toggle" for="green-checkbox-{id}">
            <input id="green-checkbox-{id}" type="checkbox" bind:checked={green} /> Green
          </label>
        </div>
      {/if}

      {#if showVariables}
        <div class="variables sliders">
          <div class="slider">
            <span>Border 1</span>
            <input type="range" bind:value={border1} />
            <span><input type="text" bind:value={border1} />px</span>
          </div>
          <div class="slider">
            <span>Border 2</span>
            <input type="range" bind:value={border2} />
            <span><input type="text" bind:value={border2} />px</span>
          </div>
          <div class="slider">
            <span>Border 3</span>
            <input type="range" bind:value={border3} />
            <span><input type="text" bind:value={border3} />px</span>
          </div>
          <div class="slider">
            <span>Border 4</span>
            <input type="range" bind:value={border4} />
            <span><input type="text" bind:value={border4} />px</span>
          </div>
        </div>

        <div class="variables sliders">
          <div class="slider">
            <span>Corner 1</span>
            <input type="range" bind:value={corner1} />
            <span><input type="text" bind:value={corner1} />%</span>
          </div>
          <div class="slider">
            <span>Corner 2</span>
            <input type="range" bind:value={corner2} />
            <span><input type="text" bind:value={corner2} />%</span>
          </div>
          <div class="slider">
            <span>Corner 3</span>
            <input type="range" bind:value={corner3} />
            <span><input type="text" bind:value={corner3} />%</span>
          </div>
          <div class="slider">
            <span>Corner 4</span>
            <input type="range" bind:value={corner4} />
            <span><input type="text" bind:value={corner4} />%</span>
          </div>
        </div>

        <div class="variables sliders">
          <div class="slider">
            <span>Size</span>
            <input type="range" bind:value={size} min={50} max={400} />
            <span><input type="text" bind:value={size} />px</span>
          </div>
          <div class="slider">
            <span>Rotate</span>
            <input type="range" bind:value={rotate} min={0} max={360} />
            <span><input type="text" bind:value={rotate} />deg</span>
          </div>
          <div class="slider">
            <span>Translate</span>
            <input type="range" bind:value={translate} min={0} max={100} />
            <span><input type="text" bind:value={translate} />px</span>
          </div>
          <div class="slider">
            <span>Speed</span>
            <input type="range" bind:value={speed} min={0} max={20} />
            <span><input type="text" bind:value={speed} />s</span>
          </div>
          <div class="slider">
            <span>Delay</span>
            <input type="range" bind:value={delay} min={0} max={20} />
            <span><input type="text" bind:value={delay} />s</span>
          </div>
          <div class="slider">
            <span>Blur</span>
            <input type="range" bind:value={blur} min={0} max={20} />
            <span><input type="text" bind:value={blur} />px</span>
          </div>
        </div>
      {/if}
    </div>
  </details>
{/if}

<style lang="less">
  figure {
    grid-column: content;
    place-content: center;
    height: 400px;
  }

  .controls {
    grid-column: content-end / full-width-end;
    grid-row: span 2;
    align-self: stretch;
    font-family: var(--sans-font);
    font-size: 14px;
    padding-left: 1rem;
    width: min-content;

    summary {
      font-weight: bold;
      margin-bottom: 1rem;
      margin-left: -1rem;
      white-space: nowrap;
      width: min-content;
    }
  }
  @container (inline-size < 1200px) {
    .controls {
      grid-column: content;
      justify-self: center;
    }
  }

  .controls-grid {
    display: grid;
    grid-template-columns: min-content auto 80px;
    gap: 1rem;
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
    gap: 0.25em;
    @media @mobile {
      gap: 0.5em;
    }
  }

  .slider {
    display: grid;
    grid-template-columns: subgrid;
    gap: 2px;
    grid-column: 1 / 4;

    input[type='range'] {
      margin-left: 1em;
      background-color: transparent;

      &::-webkit-slider-thumb {
        border-radius: 50%;
        outline: 1px solid black;
      }
      &::-moz-range-thumb {
        border-radius: 50%;
        outline: 1px solid black;
      }

      &:focus-visible {
        outline: none;
        &::-webkit-slider-thumb {
          outline: 2px solid black;
        }
        &::-moz-range-thumb {
          outline: 2px solid black;
        }
      }

      &::-moz-range-track {
        background-color: gray;
        height: 4px;
        border-radius: 2px;
        box-shadow: 0 0 1px black;
      }
    }

    input[type='text'] {
      appearance: textfield;
      border: 0;
      padding: 0;
      margin: 0;
      width: 3ch;
      box-sizing: content-box;
      display: inline-block;
      background-color: transparent;
      text-align: right;
      outline: none;
      border-radius: 3px;
      padding-inline: 5px;
      -moz-appearance: none;
      &:focus-visible {
        background-color: white;
        box-shadow: 0 0 0 1px black;
      }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      appearance: none;
    }
    input::-moz-outer-spin-button,
    input::-moz-inner-spin-button {
      -moz-appearance: none;
      appearance: none;
    }
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
    animation: spin var(--speed) linear infinite;
    --min-scale: 0.85;
    --max-scale: 1;
    visibility: hidden;
    --min-opacity: 0.5;
    --max-opacity: 0.9;

    &.show {
      visibility: visible;
    }

    &.red {
      color: red;
      // --min-opacity: 0.8;
      // --max-opacity: 1;
      animation-delay: calc(var(--delay) * -2);
      &::before {
        animation-delay: calc(var(--delay) * -2);
        rotate: calc(var(--rotate) * 1);
      }
    }
    &.blue {
      color: blue;
      --min-opacity: 0.3;
      --max-opacity: 0.9;
      animation-delay: calc(var(--delay) * -1);
      &::before {
        animation-delay: calc(var(--delay) * -1);
        rotate: calc(var(--rotate) * 2);
      }
    }
    &.green {
      color: green;
      --min-opacity: 0.3;
      --max-opacity: 0.7;
      animation-delay: calc(var(--delay) * 0);
      &::before {
        animation-delay: calc(var(--delay) * 0);
        rotate: calc(var(--rotate) * 3);
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
      transition: border-width 0.5s;
      border-radius: var(--corner1) var(--corner2) var(--corner3) var(--corner4);
      animation: wobble calc(var(--speed) / 5) ease-in-out infinite;
      background-color: white;
      filter: blur(var(--blur));
      box-shadow: 0 0 20px color-mix(in srgb, currentColor 50%, transparent);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg) translateX(0);
      opacity: var(--min-opacity);
    }
    25% {
    }
    50% {
      transform: rotate(180deg) translateX(var(--translate));
      opacity: var(--max-opacity);
    }
    75% {
    }
    100% {
      transform: rotate(360deg) translateX(0);
      opacity: var(--min-opacity);
    }
  }

  @keyframes wobble {
    0% {
      border-width: var(--border1) var(--border2) var(--border3) var(--border4);
      scale: var(--min-scale);
    }
    25% {
      border-width: var(--border4) var(--border1) var(--border2) var(--border3);
    }
    50% {
      border-width: var(--border3) var(--border4) var(--border1) var(--border2);
      scale: var(--max-scale);
    }
    75% {
      border-width: var(--border2) var(--border3) var(--border4) var(--border1);
    }
    100% {
      border-width: var(--border1) var(--border2) var(--border3) var(--border4);
      scale: var(--min-scale);
    }
  }
</style>
