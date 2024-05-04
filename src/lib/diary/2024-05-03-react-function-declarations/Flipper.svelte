<script lang="ts">
  import { onMount } from 'svelte';

  export let interval = 2000;

  let flipper: HTMLDivElement;

  function flip() {
    const children = flipper.children;
    const active = flipper.querySelector('[data-active="true"]') || (children[0] as HTMLElement);
    const next = active.nextElementSibling || (children[0] as HTMLElement);
    active.setAttribute('data-active', 'false');
    next.setAttribute('data-active', 'true');
  }

  onMount(() => {
    const timer = setInterval(flip, interval);
    return () => clearInterval(timer);
  });
</script>

<div class="flipper" bind:this={flipper}>
  <slot />
</div>

<style lang="less">
  .flipper {
    display: grid;
    grid-template-columns: 1fr;
    position: relative;

    > :global(*) {
      grid-column-start: 1;
      grid-row-start: 1;
      transition: opacity 0.2s ease-in-out;
    }

    > :global(:first-child) {
      opacity: 1;
    }
    > :global(:last-child) {
      opacity: 0;
    }

    :global([data-active='true']) {
      opacity: 1;
      position: absolute;
    }
    :global([data-active='false']) {
      opacity: 0;
      transition-delay: 0.1s;
    }
  }
</style>
