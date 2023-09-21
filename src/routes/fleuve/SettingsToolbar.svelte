<script lang="ts">
	import Toolbar from './Toolbar.svelte';
	import Slider from './Slider.svelte';
	import { settings } from './settings.store';
	import AspectRatio from './AspectRatio.svelte';
	import SettingsIcon from './settings.svg?component';
	import ResetButton from './ResetButton.svelte';
	import ShowTutorialButton from './ShowTutorialButton.svelte';
</script>

<Toolbar top right tabindex={1}>
	<button
		class="settings-button"
		slot="button"
		let:show
		let:toggle
		on:click={toggle}
		aria-label="Settings"
		title="Settings"
		class:show
		tabindex={1}
	>
		<SettingsIcon />
	</button>
	<div class="settings-panel" slot="panel" let:tabindex>
		<section>
			<Slider
				id="active-page-scale"
				label={`Large Card Size: ${$settings.activePageScale}x`}
				min={1}
				max={3}
				step={0.25}
				bind:value={$settings.activePageScale}
				title="Change the scale of active pages"
				{tabindex}
			/>
		</section>
		<section>
			<Slider
				id="active-page-scale"
				label={`Aspect Ratio: ${$settings.aspectRatio}`}
				min={0.75}
				max={2}
				step={0.05}
				bind:value={$settings.aspectRatio}
				title="Change the scale of active pages"
				{tabindex}
			/>
		</section>
		<section>
			<Slider
				id="child-opacity"
				label="Visibility"
				bind:value={$settings.childOpacity}
				title="Change the opacity for childen of the active page"
				{tabindex}
			/>
		</section>
		<!-- <section>
			<AspectRatio />
		</section> -->
		<section class="miscellany">
			<p>
				<a rel="feedback" href="mailto:pascal+fleuve@pascal.com?subject=Fleuve Feedback">
					Send feedback <span class="email-icon" />
				</a>
			</p>
			<ShowTutorialButton />
			<ResetButton />
		</section>
	</div>
</Toolbar>

<style lang="less">
	.settings-button {
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
			border: 1px solid fade(black, 30%);
			background-color: white;
			outline: 1px solid fade(black, 50%);
		}
		&:focus {
			outline: 2px solid fade(black, 50%);
		}
	}

	.settings-panel {
		padding: 0 4px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 170px;

		section {
			padding: 12px 8px;
			padding-bottom: 16px;
			width: 100%;

			+ section {
				border-top: 1px solid fade(black, 10%);
			}
		}
	}

	.miscellany {
		:global(:is(a, button)) {
			opacity: 0.7;
		}
		:global(:is(a, button):hover) {
			opacity: 1;
		}

		.email-icon {
			display: inline-block;
			width: 16px;
			height: 12px;
			border: 1px solid currentColor;
			margin-left: 4px;
			vertical-align: baseline;
			transform: translateY(1px);
			position: relative;
			border-radius: 2px;
			&::before,
			&::after {
				content: '';
				width: 10px;
				height: 1px;
				background-color: currentColor;
				position: absolute;
			}
			&::before {
				left: 0;
				top: 0;
				transform: rotate(40deg);
				transform-origin: top left;
			}
			&::after {
				right: 0;
				top: 0;
				transform: rotate(-40deg);
				transform-origin: top right;
			}
		}
	}
</style>
