<script lang="ts">
  import { page } from '$app/stores';
  import { defaultConfig, type SpinnerConfig } from './CssSpinner.svelte';

  export let config: SpinnerConfig;

  function copySetting(event: Event) {
    Object.entries(config).forEach(([key, value]) => {
      $page.url.searchParams.set(key, String(value));
    });

    navigator.clipboard.writeText($page.url.toString());
    history.replaceState(null, '', $page.url.toString());
    const button = event.target as HTMLButtonElement;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = 'Copy to clipboard';
    }, 2000);
  }

  function reset() {
    config = { ...defaultConfig };
    history.replaceState(null, '', document.location.pathname);
  }
</script>

<details class="controls" open>
  <summary>Controls</summary>
  <div class="controls-grid">
    <div class="variables sliders">
      <div class="slider">
        <span>Red</span>
        <input type="range" bind:value={config.red} />
        <span><input type="text" bind:value={config.red} />%</span>
      </div>
      <div class="slider">
        <span>Blue</span>
        <input type="range" bind:value={config.blue} />
        <span><input type="text" bind:value={config.blue} />%</span>
      </div>
      <div class="slider">
        <span>Green</span>
        <input type="range" bind:value={config.green} />
        <span><input type="text" bind:value={config.green} />%</span>
      </div>
      <div class="slider">
        <span>Yellow</span>
        <input type="range" bind:value={config.yellow} />
        <span><input type="text" bind:value={config.yellow} />%</span>
      </div>
    </div>

    <div class="variables sliders">
      <div class="slider">
        <span>Border 1</span>
        <input type="range" bind:value={config.border1} />
        <span><input type="text" bind:value={config.border1} />px</span>
      </div>
      <div class="slider">
        <span>Border 2</span>
        <input type="range" bind:value={config.border2} />
        <span><input type="text" bind:value={config.border2} />px</span>
      </div>
      <div class="slider">
        <span>Border 3</span>
        <input type="range" bind:value={config.border3} />
        <span><input type="text" bind:value={config.border3} />px</span>
      </div>
      <div class="slider">
        <span>Border 4</span>
        <input type="range" bind:value={config.border4} />
        <span><input type="text" bind:value={config.border4} />px</span>
      </div>
    </div>

    <div class="variables sliders">
      <div class="slider">
        <span>Corner 1</span>
        <input type="range" bind:value={config.corner1} />
        <span><input type="text" bind:value={config.corner1} />%</span>
      </div>
      <div class="slider">
        <span>Corner 2</span>
        <input type="range" bind:value={config.corner2} />
        <span><input type="text" bind:value={config.corner2} />%</span>
      </div>
      <div class="slider">
        <span>Corner 3</span>
        <input type="range" bind:value={config.corner3} />
        <span><input type="text" bind:value={config.corner3} />%</span>
      </div>
      <div class="slider">
        <span>Corner 4</span>
        <input type="range" bind:value={config.corner4} />
        <span><input type="text" bind:value={config.corner4} />%</span>
      </div>
    </div>

    <div class="variables sliders">
      <div class="slider">
        <span>Size</span>
        <input type="range" bind:value={config.size} min={0} max={500} />
        <span><input type="text" bind:value={config.size} />px</span>
      </div>
      <div class="slider">
        <span>Rotate</span>
        <input type="range" bind:value={config.rotate} min={0} max={360} />
        <span><input type="text" bind:value={config.rotate} />deg</span>
      </div>
      <div class="slider">
        <span>Translate</span>
        <input type="range" bind:value={config.translate} min={0} max={100} />
        <span><input type="text" bind:value={config.translate} />px</span>
      </div>
      <div class="slider">
        <span>Speed</span>
        <input type="range" bind:value={config.speed} min={0} max={20} />
        <span><input type="text" bind:value={config.speed} />s</span>
      </div>
      <div class="slider">
        <span>Delay</span>
        <input type="range" bind:value={config.delay} min={0} max={20} />
        <span><input type="text" bind:value={config.delay} />s</span>
      </div>
      <div class="slider">
        <span>Blur</span>
        <input type="range" bind:value={config.blur} min={0} max={20} />
        <span><input type="text" bind:value={config.blur} />px</span>
      </div>
    </div>

    <div class="actions">
      <button on:click={copySetting}>Copy Setting</button>
      <button on:click={reset}>Reset</button>
    </div>
  </div>
</details>

<style lang="less">
  .controls {
    grid-column: content-end / full-width-end;
    grid-row: span 3;
    align-self: stretch;
    font-family: var(--sans-font);
    font-size: 14px;
    padding-left: 1rem;
    width: min-content;
    white-space: nowrap;

    summary {
      font-weight: bold;
      margin-bottom: 1rem;
      margin-left: -1rem;
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

  .actions {
    grid-column: 1 / 4;
    display: flex;
    gap: 0.5rem;
  }
</style>
