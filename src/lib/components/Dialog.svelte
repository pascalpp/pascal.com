<script context="module" lang="ts">
  export type DialogApi = {
    open: () => void;
    close: () => void;
    element?: HTMLDialogElement;
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  export let title: string | undefined = undefined;
  let dialog: HTMLDialogElement;

  // Create a custom open function that calls the dialog element's showModal method.
  export function open() {
    dialog.showModal();
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
  {/if}
  <div class="modal-content">
    <slot />
  </div>
</dialog>

<style lang="less">
  // just using less for nesting syntax

  dialog {
    overscroll-behavior: contain;
    border: 1px solid rgba(0 0 0 / 0.3);
    border-radius: 0.5rem;
    box-shadow: 0 4px 10px rgba(0 0 0 / 0.3);
    max-width: min(95vw, 600px);
    padding: 0;

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

    .modal-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(0 0 0 / 0.1);
      font-size: 24px;
      position: sticky;
      top: 0;
      background-color: white;

      h2 {
        margin: 0;
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
        width: 2em;
        text-align: center;
        aspect-ratio: 1;
      }
    }

    .modal-content {
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
