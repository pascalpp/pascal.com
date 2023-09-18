<script lang="ts">
	export let modal = false;
	export let shadow = true;
	export let fill = false;
	export let style = '';
</script>

<section class="card" class:modal class:shadow class:fill {style}>
	<slot />
</section>

<style lang="less">
	.card {
		margin: 0;
		padding: 16px;
		background-color: white;
		border: 1px solid fade(black, 30%);
		border-radius: 4px;
		overflow: hidden;

		&.shadow {
			box-shadow: 0 1px 4px fade(black, 10%);
		}

		&.fill {
			width: 100%;
			height: 100%;
		}

		&.modal {
			position: relative;
			min-width: 300px;
			max-width: 400px;
			font-size: 16px;
			margin-top: 10vh;
			margin-bottom: 10vh;
			padding: 20px;
			border-radius: 6px;
			border: 1px solid fade(black, 20%);
			box-shadow: 0px 5px 10px fade(black, 10%);

			@media @mobile {
				margin-top: 0;
				margin-bottom: 0;
				border-radius: 0px;
			}
		}
	}
</style>
