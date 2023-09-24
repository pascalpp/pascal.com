<script lang="ts">
  export let id: string;

  const debug = true;
</script>

{#key id}
  <div class="leaf" class:debug>
    <slot />
  </div>
{/key}

<style lang="less">
  .leaf {
    display: block;
    &.debug {
      &:focus-within {
        outline: 1px solid red;
        outline-offset: 8px;
      }
      &:has(.leaf:focus-within) {
        outline: 1px solid fade(red, 50%);
      }
    }
  }
</style>
