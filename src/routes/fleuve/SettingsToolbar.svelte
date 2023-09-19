<script lang="ts">
	import Toolbar from './Toolbar.svelte';
	import Slider from './Slider.svelte';
	import { settings } from './settings.store';
	import AspectRatio from './AspectRatio.svelte';
	import SettingsIcon from './settings.svg?component';

	function focus(event: MouseEvent) {
		const target = event.target as HTMLElement;
		target.focus();
	}
</script>

<Toolbar top right column>
	<button slot="button" let:show let:toggle on:click={toggle} aria-label="Settings" title="Settings" class:show>
		<SettingsIcon />
	</button>
	<svelte:fragment slot="panel">
		<Slider
			id="active-page-scale"
			label="Scale"
			min={0.1}
			bind:value={$settings.activePageScale}
			title="Change the scale of active pages"
		/>
		<Slider
			id="child-opacity"
			label="Visibility"
			bind:value={$settings.childOpacity}
			title="Change the opacity for childen of the active page"
		/>
		<AspectRatio />
	</svelte:fragment>
</Toolbar>

<style lang="less">
	button {
		padding: 8px;
		border-radius: 4px;
		:global(svg) {
			width: 24px;
			height: 24px;
			stroke-width: 1;
		}

		&.show,
		&:focus,
		&:hover {
			outline: 1px solid fade(black, 50%);
			background-color: white;
		}
	}
</style>
