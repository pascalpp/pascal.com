<script lang="ts">
	export let id: string;
	export let value: number;
	export let min: number = 0;
	export let max: number = 1;
	export let step: number = 0.1;
	export let label: string;
	export let title: string | undefined = undefined;

	let input: HTMLInputElement;

	$: labelValue = value.toFixed(step.toString().split('.')[1]?.length ?? 0);
</script>

<fieldet class="slider" {title} on:click={() => input.focus()}>
	<label for={id}>{label} {labelValue}</label>
	<input {id} type="range" {min} {max} {step} bind:value bind:this={input} />
</fieldet>

<style lang="less">
	.slider {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;

		input {
			&::-webkit-slider-thumb {
				outline: 1px solid black;
				border-radius: 50%;
			}

			&:active,
			&:focus {
				outline: none;
				&::-webkit-slider-thumb {
					outline: 2px solid black;
				}
			}
		}
	}
</style>
