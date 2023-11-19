<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { Layer } from './Layer.svelte';

  export let title = '';
  export let padded = true;
  let dialog: HTMLDialogElement;

  const layer: Writable<Layer> = getContext('layer');

  // Create a custom open function that calls the dialog element's showModal method.
  export function open() {
    dialog.showModal();
    $layer?.crop();
  }

  // Create a custom close function that sets a closing attribute on the dialog
  // element. This attribute is used to trigger the closing animation. So we add
  // a listener for animationend which calls the afterClosing method below. By
  // passing once: true, we don't have to remove this event listener.
  export function close() {
    dialog.addEventListener('animationend', afterClosing, { once: true });
    dialog.setAttribute('closing', '');
  }

  // Now that the closing animation is complete, we can remove the closing
  // attribute and call the dialog's close method.
  function afterClosing() {
    dialog.removeAttribute('closing');
    dialog.close();
    $layer?.uncrop();
  }

  // When the user presses the escape key, the browser calls the dialog's close
  // method directly, bypassing our nice closing animation. So we can listen for
  // the 'cancel' event, prevent its default behavior, and call our custom close
  // method instead.
  function onCancel(event: Event) {
    event.preventDefault();
    close();
  }

  onMount(() => {
    dialog.addEventListener('cancel', onCancel);

    return () => {
      dialog.removeEventListener('cancel', onCancel);
    };
  });
</script>

<dialog bind:this={dialog}>
  {#if title}
    <div class="modal-title">
      <h2>{title}</h2>
      <button class="close-button" on:click={close}>&#x2717;</button>
    </div>
  {:else}
    <button class="close-button" on:click={close}>&#x2717;</button>
  {/if}
  <div class="modal-content" class:padded>
    <slot />
  </div>
</dialog>

<style lang="less">
  dialog {
    overscroll-behavior: contain;
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--dialog-color, black) 20%, transparent), 0 4px 10px rgba(0 0 0 / 0.3);
    padding: 0;
    margin: auto;
    background-color: var(--dialog-background-color, white);
    color: var(--dialog-color, black);

    &::backdrop {
      background-image: linear-gradient(45deg, hsla(0 50% 50% / 0.5), hsla(200 50% 50%/ 0.5));
      backdrop-filter: blur(4px);
    }

    &:is([open]) {
      animation: fade-in 0.2s ease-out, slide-in 0.2s ease-out;
      &::backdrop {
        animation: fade-in 0.2s ease-out;
      }
    }
    &:is([closing]) {
      animation: fade-out 0.2s ease-out, slide-out 0.2s ease-out;
      &::backdrop {
        animation: fade-out 0.2s ease-out;
      }
    }

    .close-button {
      appearance: none;
      border: none;
      background: none;
      border: none;
      box-shadow: none;
      font-size: 1.25rem;
      border-radius: 4px;
      padding: 0;
      width: 1.5em;
      text-align: center;
      aspect-ratio: 1;
      color: inherit;
      font-family: inherit;
      outline: none;
      background-color: var(--dialog-background-color, white);
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      cursor: pointer;
      border: 1px solid color-mix(in srgb, var(--dialog-color, black) 30%, transparent);
    }

    .modal-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid color-mix(in srgb, var(--dialog-color, black) 15%, transparent);
      font-size: 18px;
      position: sticky;
      top: 0;
      background-color: var(--dialog-background-color, white);

      h2 {
        margin: 0;
        font-weight: 500;
      }

      .close-button {
        border: none;
        position: static;
      }
    }

    .modal-content.padded {
      padding: 1rem;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
</style>
