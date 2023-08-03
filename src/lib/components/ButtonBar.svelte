<script lang="ts" context="module">
  interface ButtonBarOption {
    value: string;
    label: string;
  }
</script>

<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  export let options: ButtonBarOption[] | undefined = undefined;
  export let selected: string | undefined = undefined;
  export let tiny = false;
  export let small = false;
  export let medium = false;
  export let large = false;
  export let wide = false;
  export let disabled = false;
</script>

<div class="button-bar">
  <slot>
    {#if options}
      {#each options as { value, label }}
        <Button
          secondary
          {label}
          {tiny}
          {small}
          {medium}
          {large}
          {wide}
          {value}
          {disabled}
          active={value === selected}
          on:click
        />
      {/each}
    {/if}
  </slot>
</div>

<style lang="less">
  .button-bar {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    :global(.button.roundrect.secondary) {
      &:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left: -1px;
      }
      &:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    :global(.button.roundrect.secondary.active) {
      z-index: 1;
      --background-color: #555;
      --text-color: #fff;
    }
    :global(.button.roundrect:focus) {
      z-index: 2;
    }
  }
</style>
