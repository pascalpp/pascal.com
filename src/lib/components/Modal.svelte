<script lang="ts">
  import { getContext } from 'svelte';
  import type { Layer } from '$lib/components/Layer.svelte';
  import Button from '$lib/components/Button.svelte';
  import { fade } from 'svelte/transition';
  import { fly } from 'svelte/transition';
  import { createFocusTrap } from 'focus-trap';
  import type { FocusTrap } from 'focus-trap';
  import type { Writable } from 'svelte/store';

  let isOpen = false;
  export let backdrop = true;
  export let duration = 250;
  export let distance = 500;
  export let trapFocus = true;

  let modal: HTMLDivElement | undefined;
  let trap: FocusTrap | undefined;

  const layer: Writable<Layer> = getContext('layer');
  $: ({ crop, uncrop } = $layer);

  export function open() {
    crop();
    isOpen = true;
  }

  export function close() {
    uncrop();
    isOpen = false;
    modal = undefined;
  }

  function onKeydown(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.key === 'Escape') {
      close();
    }
  }

  $: if (modal && isOpen && trapFocus) {
    document.body.appendChild(modal);
    trap = createFocusTrap(modal, {
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
    });
    trap.activate();
  } else {
    trap?.deactivate();
    trap = undefined;
  }
</script>

<slot name="trigger" {open} />

{#if isOpen}
  <div class="modal" on:keydown={onKeydown} tabindex={0} bind:this={modal}>
    {#if backdrop}
      <div class="modal-backdrop" transition:fade={{ duration: duration / 2 }} />
    {/if}

    <div class="modal-content" role="dialog" transition:fly={{ y: -distance, duration }}>
      <slot name="content" {close}>
        <Button small secondary on:click={close} label="Close" />
      </slot>
    </div>
  </div>
{/if}

<style lang="less">
  .modal {
    outline: none;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    overscroll-behavior: contain;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .modal-backdrop {
    pointer-events: all;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
    z-index: 2;
  }

  .modal-content {
    pointer-events: all;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 3;
  }
</style>
