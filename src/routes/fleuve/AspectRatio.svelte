<script lang="ts">
	import { settings, type AspectRatio } from './settings.store';
	import File from './file.svg?component';

	let portraitButton: HTMLElement;
	let landscapeButton: HTMLElement;

	function setAspectRatio(event: MouseEvent) {
		const target = event.currentTarget as HTMLElement;
		$settings.aspectRatioType = target.dataset.value as AspectRatio;
	}

	function onKeydown(event: KeyboardEvent) {
		console.log(event.key);
		if (event.key === 'ArrowRight') {
			landscapeButton.click();
			landscapeButton.focus();
		}
		if (event.key === 'ArrowLeft') {
			portraitButton.click();
			portraitButton.focus();
		}
	}
</script>

<div class="aspect-ratio">
	<label for="foo">Aspect Ratio</label>
	<button on:keydown={onKeydown}>
		<span
			data-value="portrait"
			class:active={$settings.aspectRatioType === 'portrait'}
			on:click={setAspectRatio}
			bind:this={portraitButton}
		>
			<File />
		</span>
		<span
			data-value="landscape"
			class:active={$settings.aspectRatioType === 'landscape'}
			on:click={setAspectRatio}
			bind:this={landscapeButton}
		>
			<File />
		</span>
	</button>
</div>

<style lang="less">
	.aspect-ratio {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;

		button {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: stretch;
			border: none;
			padding: 0;
			margin: 0;
			border-radius: 4px;
			border: 1px solid black;
			background-color: #666;
			overflow: hidden;
			&:focus,
			&:focus-within {
				outline: 1px solid black;
			}

			span {
				background-color: white;
				outline: none;
				cursor: pointer;
				user-select: none;
				:global(svg) {
					width: auto;
					height: 20px;
					stroke-width: 1.5;
				}
				padding: 8px 12px;

				&:focus {
					background-color: #f8f8f8;
				}
				&.active {
					background-color: #666;
					color: white;
				}

				&[data-value='landscape'] {
					:global(svg) {
						transform: rotate(90deg) scaleX(-1);
					}
				}
			}
		}
	}
</style>
