<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import randomHexColor from './randomColor';

  let color = randomHexColor();
  let hovercolor = randomHexColor();
  let endcolor = randomHexColor();
  let animating = false;

  function startAnimating(event: MouseEvent | KeyboardEvent) {
    if (animating) return;
    const target = event.target as HTMLElement;
    target.addEventListener('animationend', stopAnimating, { once: true });
    animating = true;
  }

  function stopAnimating() {
    color = endcolor;
    hovercolor = randomHexColor();
    endcolor = randomHexColor();
    animating = false;
  }

  function intervalColor() {
    if (animating) return;
    color = randomHexColor();
  }

  let intervalTime = Math.random() * 4000;
  onMount(() => {
    const interval = setInterval(intervalColor, intervalTime);
    return () => clearInterval(interval);
  });
</script>

<div
  class="swatch"
  style="--color: {color}; --hovercolor: {hovercolor}; --endcolor: {endcolor};"
  on:mouseenter={startAnimating}
  on:click={startAnimating}
  on:keypress={startAnimating}
  class:animating
  role="button"
  tabindex="0"
/>

<style lang="less">
  .swatch {
    background-color: var(--color);
    transition: background-color 2s ease-out;
    border: 1px solid rgba(0 0 0 / 0.2);
    border-radius: 4px;
    aspect-ratio: 1;
    &.animating {
      pointer-events: none;
      animation: bloom 2s ease-out forwards;
    }
  }

  @keyframes bloom {
    0% {
      background-color: var(--color);
      scale: 1;
      opacity: 1;
    }
    50% {
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
