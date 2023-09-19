<script lang="ts">
	import { settings } from './settings.store';

	$: aspectRatio = $settings.aspectRatioType === 'portrait' ? 0.85 : 1.2;
</script>

<div
	class="settings-context"
	style:--child-opacity={$settings.childOpacity}
	style:--active-page-scale={$settings.activePageScale}
	style:--aspect-ratio={aspectRatio}
>
	<slot />
</div>

<style lang="less">
	.settings-context {
		display: contents;
	}
</style>
