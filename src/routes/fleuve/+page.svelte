<script lang="ts">
	import './page.less';
	import { browser } from '$app/environment';
	import PageCard from './PageCard.svelte';
	import Slider from './Slider.svelte';
	import { pageStore, reset } from './pages.store';
	import { settings } from './settings.store';
	import Changelog from './changelog.md';
	import { metadata } from './changelog.md';
	import File from './file.svg?component';

	if (browser) (<any>window).pageStore = pageStore;

	let firstPageId: string;
	let showChangelog = false;
	$: aspectRatio = $settings.aspectRatioType === 'portrait' ? 0.85 : 1.2;

	function scale(number: number, inMin: number, inMax: number, outMin: number, outMax: number) {
		return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
	}

	function onClickReset() {
		if (confirm('Are you sure you want to start over with an empty document?')) {
			reset();
		}
	}

	function toggleChangelog() {
		showChangelog = !showChangelog;
		requestAnimationFrame(() => {
			if (showChangelog) {
				document.body.addEventListener('click', toggleChangelog);
			} else {
				document.body.removeEventListener('click', toggleChangelog);
			}
		});
	}

	function setAspectRatio(event: MouseEvent) {
		const target = event.currentTarget as HTMLButtonElement;
		$settings.aspectRatioType = target.value as 'portrait' | 'landscape';
	}

	pageStore.subscribe((pages) => {
		firstPageId = pages[0].id;
	});
</script>

<main>
	<div
		class="pages"
		style:--child-opacity={$settings.childOpacity}
		style:--active-page-scale={scale($settings.activePageScale, 0, 1, 0.2, 1)}
		style:--aspect-ratio={aspectRatio}
	>
		{#if browser && firstPageId}
			{#key firstPageId}
				<PageCard pageId={firstPageId} />
			{/key}
		{/if}
	</div>

	{#if browser}
		<div class="tools column top right">
			<Slider
				id="active-page-scale"
				label="Scale"
				bind:value={$settings.activePageScale}
				title="Change the scale of active pages"
			/>
			<Slider
				id="child-opacity"
				label="Opacity"
				bind:value={$settings.childOpacity}
				title="Change the opacity for childen of the active page"
			/>
			<div class="aspect-ratio">
				<label for="foo">Aspect Ratio</label>
				<fieldset>
					<button value="portrait" class:active={$settings.aspectRatioType === 'portrait'} on:click={setAspectRatio}>
						<File />
					</button>
					<button value="landscape" class:active={$settings.aspectRatioType === 'landscape'} on:click={setAspectRatio}>
						<File />
					</button>
				</fieldset>
			</div>
		</div>
	{/if}

	<div class="tools row bottom left">
		<button class="reset-button" on:click={onClickReset}>Reset</button>
	</div>

	<div class="tools row bottom right">
		<button class="version" on:click={toggleChangelog}>Version {metadata.latest}</button>
		<div class="changelog" class:show={showChangelog}>
			<div class="changelog-content">
				<Changelog />
			</div>
		</div>
	</div>
</main>

<style lang="less">
	main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: scroll;
	}

	.pages {
		position: absolute;
		top: 0;
		left: 0;
		padding: 10vw;
		box-sizing: border-box;
	}

	.tools {
		font-size: 13px;
		z-index: 1;
		position: fixed;
		padding: 12px;
		padding-right: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2em;
		opacity: 0.3;
		&:active,
		&:hover,
		&:focus-within,
		&:has(.changelog.show) {
			opacity: 1;
		}

		&.row {
			flex-direction: row;
		}
		&.column {
			flex-direction: column;
		}

		&.top {
			top: 0px;
		}
		&.left {
			left: 0px;
		}
		&.right {
			right: 0px;
		}
		&.bottom {
			bottom: 0px;
		}
	}

	button {
		cursor: pointer;
		user-select: none;
	}

	.aspect-ratio {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;

		fieldset {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: stretch;
			border: none;
			padding: 0;
			margin: 0;
		}

		button {
			:global(svg) {
				width: auto;
				height: 16px;
			}
			border: 1px solid black;
			padding: 4px 12px;
			+ button {
				margin-left: -1px;
			}

			&:first-child {
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
			}
			&:last-child {
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
			}

			&.active {
				background-color: black;
				color: white;
			}

			&[value='landscape'] {
				:global(svg) {
					transform: rotate(90deg) scaleX(-1);
				}
			}
		}
	}

	.changelog {
		position: absolute;
		bottom: 100%;
		right: 20px;
		min-width: 400px;
		background-color: white;
		border-radius: 8px;
		border: 1px solid fade(black, 20%);
		transition: all 0.2s ease-in-out;
		box-shadow: 0 4p 4px 0 rgba(black, 0.1);
		max-height: 0;
		overflow: hidden;
		overflow-y: scroll;

		.changelog-content {
			height: fit-content;
			padding-bottom: 12px;
		}

		opacity: 0;
		&.show {
			max-height: 90vh;
			opacity: 1;
		}
	}
</style>
