<script lang="ts" context="module">
  export type SpinnerConfig = {
    red: number;
    blue: number;
    green: number;
    yellow: number;
    border1: number;
    border2: number;
    border3: number;
    border4: number;
    corner1: number;
    corner2: number;
    corner3: number;
    corner4: number;
    size: number;
    rotate: number;
    translate: number;
    blur: number;
    speed: number;
    delay: number;
  };

  export const defaultConfig: SpinnerConfig = {
    red: 90,
    blue: 80,
    green: 70,
    yellow: 30,
    border1: 20,
    border2: 35,
    border3: 15,
    border4: 5,
    corner1: 45,
    corner2: 40,
    corner3: 50,
    corner4: 40,
    size: 300,
    rotate: 45,
    translate: 10,
    blur: 3,
    speed: 20,
    delay: 5,
  };
</script>

<script lang="ts">
  import SpinnerControls from './SpinnerControls.svelte';

  export let showControls = false;

  export let config: SpinnerConfig = { ...defaultConfig };
</script>

<figure>
  <div
    class="fuzzy-spinner"
    style="
      --size: {config.size}px; --translate: {config.translate}px; --rotate: {config.rotate}deg;
      --blur: {config.blur}px; --speed: {config.speed}s; --delay: {config.delay}s;
      --red: {config.red}; --blue: {config.blue}; --green: {config.green}; --yellow: {config.yellow};
      --border1: {config.border1}px; --border2: {config.border2}px; --border3: {config.border3}px; --border4: {config.border4}px;
      --corner1: {config.corner1}%; --corner2: {config.corner2}%; --corner3: {config.corner3}%; --corner4: {config.corner4}%;
    "
  >
    <div class="spinner red" class:blur={config.blur > 0} />
    <div class="spinner blue" class:blur={config.blur > 0} />
    <div class="spinner green" class:blur={config.blur > 0} />
    <div class="spinner yellow" class:blur={config.blur > 0} />
  </div>
</figure>

{#if showControls}
  <SpinnerControls bind:config />
{/if}

<style lang="less">
  figure {
    grid-column: content;
    place-content: center;
    height: 400px;
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

    &.red {
      color: red;
      --max-opacity: calc(var(--red) / 100);
      --min-opacity: calc(var(--max-opacity) * 0.6);
      animation-delay: calc(var(--delay) * -3);
      &::before {
        animation-delay: calc(var(--delay) * -3);
        rotate: calc(var(--rotate) * 1);
      }
    }
    &.blue {
      color: blue;
      --max-opacity: calc(var(--blue) / 100);
      --min-opacity: calc(var(--max-opacity) * 0.3);
      animation-delay: calc(var(--delay) * -2);
      &::before {
        animation-delay: calc(var(--delay) * -2);
        rotate: calc(var(--rotate) * 2);
      }
    }
    &.green {
      color: green;
      --max-opacity: calc(var(--green) / 100);
      --min-opacity: calc(var(--max-opacity) * 0.3);
      animation-delay: calc(var(--delay) * -1);
      &::before {
        animation-delay: calc(var(--delay) * -1);
        rotate: calc(var(--rotate) * 3);
      }
    }
    &.yellow {
      color: gold;
      --max-opacity: calc(var(--yellow) / 100);
      --min-opacity: calc(var(--max-opacity) * 0.3);
      animation-delay: calc(var(--delay) * 0);
      &::before {
        animation-delay: calc(var(--delay) * 0);
        rotate: calc(var(--rotate) * 4);
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
