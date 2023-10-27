<script lang="ts">
  export let modal: HTMLDialogElement;
</script>

<dialog bind:this={modal}>
  <slot />
</dialog>
