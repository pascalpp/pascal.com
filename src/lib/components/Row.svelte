<script lang="ts">
  export let center = false;
  export let right = false;
  export let spread = false;
  export let stretch = false;
  export let top = false;
  export let bottom = false;
  export let wrap = false;
  export let reverse = false;
  export let fill = false;
  export let gap = '1em';
</script>

<section
  class="row"
  class:center
  class:right
  class:spread
  class:stretch
  class:top
  class:bottom
  class:wrap
  class:reverse
  class:fill
  style="gap: {gap}"
>
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
    &.reverse {
      flex-direction: row-reverse;
    }
    &.fill {
      width: 100%;
      height: 100%;
    }

    > :global(*) {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
</style>
