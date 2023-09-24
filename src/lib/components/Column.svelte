<script lang="ts">
  export let left = false;
  export let center = false;
  export let right = false;
  export let spread = false;
  export let fill = false;
  export let gap = '1em';
  export let title: string | undefined = undefined;
</script>

<section class="column" class:left class:center class:right class:spread class:fill style="gap: {gap}" {title}>
  <slot />
</section>

<style lang="less">
  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    &.left {
      align-items: flex-start;
    }
    &.center {
      align-items: center;
    }
    &.right {
      align-items: flex-end;
    }
    &.spread {
      justify-content: space-between;
      flex: 1;
    }
    &.fill {
      width: 100%;
      height: 100%;
    }

    // elements directly inside columns should mind the gap.
    // no top/bottom margin needed
    > :global(*) {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
</style>
