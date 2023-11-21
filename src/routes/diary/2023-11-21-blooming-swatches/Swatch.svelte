<script lang="ts">
  import randomHexColor from './randomColor';

  export let color = 'red';
  export let hovercolor = 'blue';
  let animating = false;

  function startAnimating(event: MouseEvent | KeyboardEvent) {
    if (animating) return;
    const target = event.target as HTMLElement;
    target.addEventListener('animationend', stopAnimating, { once: true });
    animating = true;
  }

  function stopAnimating() {
    color = randomHexColor();
    hovercolor = randomHexColor();
    animating = false;
  }
</script>

<div
  class="swatch"
  style="--color: {color}; --hovercolor: {hovercolor}"
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
    border: 1px solid rgba(0 0 0 / 0.2);
    border-radius: 4px;
    aspect-ratio: 1;
    transition: background-color 4s ease-in-out;
    &.animating {
      pointer-events: none;
      animation: bloom 1.5s ease-out forwards;
    }
  }

  @keyframes bloom {
    0%,
    100% {
      background-color: var(--color);
      scale: 1;
      opacity: 1;
    }
    75% {
      background-color: var(--hovercolor);
      scale: 3;
      opacity: 0;
    }
  }
</style>
