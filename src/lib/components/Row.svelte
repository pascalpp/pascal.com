<script lang="ts">
  import classnames from 'classnames';

  export let center = false;
  export let right = false;
  export let spread = false;
  export let stretch = false;
  export let top = false;
  export let bottom = false;
  export let wrap = false;
  export let gap = '1em';

  const className = classnames('row', {
    center,
    right,
    spread,
    stretch,
    top,
    bottom,
    wrap,
  });
</script>

<section class={className} style="gap: {gap}">
  <slot />
</section>

<style lang="less">
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    &.center {
      justify-content: center;
    }
    &.right {
      justify-content: flex-end;
    }
    &.spread {
      justify-content: space-between;
    }

    &.top {
      align-items: flex-start;
    }
    &.bottom {
      align-items: flex-end;
    }
    &.stretch {
      align-items: stretch;
    }
    &.wrap {
      flex-wrap: wrap;
    }
  }
</style>
