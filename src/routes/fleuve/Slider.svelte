<script lang="ts">
	export let id: string;
	export let value: number;
	export let min: number = 0;
	export let max: number = 1;
	export let step: number = 0.1;
	export let label: string;
	export let title: string | undefined = undefined;
	export let tabindex = 1;

	let input: HTMLInputElement;
</script>

<fieldet class="slider" {title} on:click={() => input.focus()}>
	<label for={id}>{label}</label>
	<input {id} type="range" {min} {max} {step} bind:value bind:this={input} {tabindex} />
</fieldet>

<style lang="less">
	.slider {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;

		label {
			margin: 0;
		}

		input {
			width: 100%;
			&::-webkit-slider-track,
			&::-moz-range-track {
				background-color: steelblue;
				height: 4px;
				border-radius: 2px;
			}

			&::-webkit-slider-thumb,
			&::-moz-range-thumb {
				outline: 1px solid black;
				border-radius: 50%;
			}

			&:active,
			&:focus {
				outline: none;
				&::-webkit-slider-thumb,
				&::-moz-range-thumb {
					outline: 2px solid black;
				}
			}
		}
	}
</style>
