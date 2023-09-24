<script lang="ts">
  import { settings } from './settings.store';

  // $: aspectRatio = $settings.aspectRatioType === 'portrait' ? 0.85 : 1.2;
</script>

<div
  class="settings-context"
  style:--child-opacity={$settings.childOpacity}
  style:--active-page-scale={$settings.activePageScale}
  style:--aspect-ratio={$settings.aspectRatio}
  style:--card-min-height="40px"
  style:--card-min-width="80px"
  style:--card-max-width="200px"
  style:--card-title-bgcolor="#fff7cd"
  style:--card-animation-speed={`${$settings.cardAnimationSpeed}s`}
>
  <slot />
</div>

<style lang="less">
  .settings-context {
    display: contents;
  }
</style>
