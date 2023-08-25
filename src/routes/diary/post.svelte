<script>
	export let title;
	export let date;
</script>

<svelte:head>
	<title>Pascal’s Diary · {title}</title>
</svelte:head>

<header>
	<h1>{title}</h1>
	<p class="date">{date}</p>
</header>

<article>
	<slot />
</article>

<style lang="less">
	header {
		margin-top: 2em;
		margin-bottom: 2em;

		h1 {
			margin: 0;
			line-height: 1.2;
			font-size: 36px;
			font-weight: 500;
		}

		.date {
			font-family: @sans-font;
			border-bottom: 1px solid rgb(0 0 0 / 0.1);
			margin: 0.5em 0;
			margin-left: -0.75em;
			padding: 0.75em;
			padding-right: 3em;
			padding-top: 0;
			width: max-content;
		}
	}

	article {
		flex-grow: 1;
		font-weight: 200;
		font-size: 20px;
		display: flex;
		flex-direction: column;
		gap: 1em;

		:global(h1),
		:global(h2),
		:global(h3),
		:global(h4),
		:global(h5),
		:global(h6) {
			font-weight: 500;
		}
		:global(h1) {
			font-size: 36px;
		}
		:global(h2) {
			font-size: 28px;
		}
		:global(h3) {
			font-size: 20px;
		}

		:global(.polaroid) {
			width: max-content;
			.rotated-shadow;
			translate: -0.25em -0.25em;
		}

		:global(.polaroid img) {
			padding: 1em;
			background-color: white;
			z-index: 1;
			border-radius: 2px;
			border: 1px solid rgb(0 0 0 / 0.1);
		}
	}
</style>
