<script lang="ts">
  // this component renders a Toast component and provides an API method via
  // context to show a toast message.

  import Toast, { type ToastOptions } from '$lib/components/Toast.svelte';
  import { setContext } from 'svelte';

  let message: string | undefined = undefined;
  let toast: Toast;

  function showToast(text: string, options: ToastOptions) {
    message = text;
    toast.show(options);
  }

  setContext('showToast', showToast);
</script>

<slot />

<Toast bind:this={toast}>{message}</Toast>
