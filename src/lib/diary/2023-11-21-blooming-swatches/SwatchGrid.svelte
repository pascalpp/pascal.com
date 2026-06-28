<script lang="ts">
  import * as Tone from 'tone';
  import Swatch from './Swatch.svelte';
  import { onMount } from 'svelte';
  import Slider from '$lib/components/Slider.svelte';

  export let swatches = new Array(64).fill(null);

  let showNote = true;
  let synth: Tone.PolySynth;
  let distortionPedal: Tone.Distortion;
  let distortion = 0;
  let audioEnabled = false;
  let volume = -10;

  async function startTone() {
    await Tone.start();
    audioEnabled = true;
  }

  onMount(() => {
    distortionPedal = new Tone.Distortion(0).toDestination();

    synth = new Tone.PolySynth(Tone.Synth);
    synth.set({ detune: 0, volume });
    synth.connect(distortionPedal);
  });

  $: distortionPedal?.set({ distortion });
  $: synth?.set({ volume });
</script>

<div class="row">
  <div class="swatch-grid">
    {#each swatches as _}
      <Swatch {showNote} {synth} {audioEnabled} />
    {/each}
  </div>

  <div class="controls">
    <button disabled={audioEnabled} on:click={startTone}>Enable audio</button>

    {#if audioEnabled}
      <Slider id="volume" label="Volume" min={-50} max={-10} bind:value={volume} />
      <Slider id="distortion" label="Distortion" min={0} max={0.5} bind:value={distortion} />
    {/if}
  </div>
</div>

<style lang="less">
  .row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    @media @mobile {
      flex-direction: column;
      gap: 0;
    }
  }

  .swatch-grid {
    width: 620px;
    touch-action: none;
    margin-block: 1rem;
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: 1fr;
    user-select: none;

    @media @mobile {
      width: calc(100% - 2rem);
    }
  }

  .controls {
    font-size: 14px;
    font-family: var(--sans-font);
    padding-block: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
