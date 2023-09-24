<script lang="ts">
  import type { PageId } from './pages.store';

  export let id: string;
  export let parentId: PageId | undefined = undefined;

  const debug = false;
</script>

{#key id}
  <div class="leaf" class:debug class:root={parentId === 'root'}>
    <slot />
  </div>
{/key}

<style lang="less">
  .leaf {
    display: block;
    position: relative;

    &.debug {
      &:focus-within {
        outline: 1px solid red;
        outline-offset: 8px;
      }
      &:has(.leaf:focus-within) {
        outline: 1px solid fade(red, 50%);
      }
    }

    &:not(.root) {
      &:last-child:not(:first-child) {
        position: absolute;
        left: 0;
        top: 100%;
        padding-top: 16px;
      }
    }
  }
</style>
