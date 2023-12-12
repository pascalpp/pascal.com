<script lang="ts">
  import * as Tone from 'tone';
  import { onMount } from 'svelte';
  import { randomHexColor, randomNote } from './helpers';

  export let showNote = false;
  export let synth: Tone.PolySynth;
  export let audioEnabled = false;

  let color = randomHexColor();
  let hovercolor = randomHexColor();
  let endcolor = randomHexColor();
  let key = randomNote();
  let animating = false;

  function startAnimating(event: MouseEvent | TouchEvent | KeyboardEvent) {
    if (animating) return;
    const target = event.target as HTMLElement;
    target.addEventListener('animationend', stopAnimating, { once: true });
    animating = true;
    if (audioEnabled) synth.triggerAttackRelease(key, '4n');
  }

  function stopAnimating() {
    color = endcolor;
    hovercolor = randomHexColor();
    endcolor = randomHexColor();
    animating = false;
  }

  function changeColor() {
    if (animating) return;
    color = randomHexColor();
  }

  let interval = Math.ceil(Math.random() * 26);

  onMount(() => {
    const timer = setInterval(changeColor, interval * 200);
    return () => clearInterval(timer);
  });
</script>

<div
  class="swatch"
  style="--color: {color}; --hovercolor: {hovercolor}; --endcolor: {endcolor};"
  on:mouseenter={startAnimating}
  on:click={startAnimating}
  on:touchstart={startAnimating}
  on:touchmove={startAnimating}
  on:touchend={startAnimating}
  on:keypress={startAnimating}
  class:animating
  role="button"
  tabindex="0"
>
  {#if showNote && audioEnabled}
    <span class="note">{key}</span>
  {/if}
</div>

<style lang="less">
  .swatch {
    touch-action: none;
    background-color: var(--color);
    transition: background-color 2s ease-out;
    border: 1px solid rgba(0 0 0 / 0.2);
    border-radius: 4px;
    aspect-ratio: 1;
    &.animating {
      pointer-events: none;
      animation: bloom 2s ease-out forwards;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 1px 1px rgba(0 0 0 / 1), 0px 0px 1px rgba(0 0 0 / 1);
    font-family: var(--font-sans);
    color: white;
    font-weight: bold;
    text-transform: uppercase;

    .note {
      @media @mobile {
        display: none;
      }
    }
  }

  @keyframes bloom {
    0% {
      background-color: var(--color);
      scale: 1;
      opacity: 1;
    }
    90% {
      background-color: var(--hovercolor);
      scale: 3;
      opacity: 0.1;
    }
    100% {
      background-color: var(--endcolor);
      scale: 1;
      opacity: 1;
    }
  }
</style>
