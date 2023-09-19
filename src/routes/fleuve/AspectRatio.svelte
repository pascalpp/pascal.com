<script lang="ts">
	import { settings, type AspectRatio } from './settings.store';
	import File from './file.svg?component';

	function setAspectRatio(event: MouseEvent) {
		const target = event.currentTarget as HTMLButtonElement;
		$settings.aspectRatioType = target.value as AspectRatio;
	}
</script>

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

<style lang="less">
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
			cursor: pointer;
			user-select: none;
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
</style>
