<script lang="ts">
	import Column from '$lib/components/Column.svelte';

	export let id: string;
	export let value: number;
	export let min: number = 0;
	export let max: number = 1;
	export let step: number = 0.1;
	export let label: string;
	export let title: string | undefined = undefined;

	$: labelValue = value.toFixed(step.toString().split('.')[1]?.length ?? 0);
</script>

<Column center gap="4px" {title}>
	<label for={id}>{label} {labelValue}</label>
	<input {id} type="range" {min} {max} {step} bind:value />
</Column>

<style lang="less">
	&:active,
	&:focus {
		outline: none;
		&::-webkit-slider-thumb {
			outline: 2px solid black;
			border-radius: 50%;
		}
	}
</style>
