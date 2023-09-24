<script lang="ts">
  export let id: string;
</script>

{#key id}
  <div class="leaf">
    <slot />
  </div>
{/key}

<style lang="less">
  .leaf {
    box-shadow: 0 0 0 1px fade(red, 50%);
  }
</style>
