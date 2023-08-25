<script>
	export let data;

	$: ({ post, next, prev } = data);
	$: ({ title, date, content } = post);
</script>

<svelte:head>
	<title>Pascal’s Diary · {title}</title>
</svelte:head>

<header>
	<h1>{title}</h1>
	<p class="date">{date}</p>
</header>

<nav class="post-navigation top">
	{#if prev}
		<div class="prev">
			<a href="/diary/{prev.slug}">← {prev.metadata.title}</a>
		</div>
	{/if}
	{#if next}
		<div class="next">
			<a href="/diary/{next.slug}">{next.metadata.title} →</a>
		</div>
	{/if}
</nav>

<article>
	<svelte:component this={content} />

	<nav class="post-navigation bottom">
		{#if prev}
			<div class="prev">
				<a href="/diary/{prev.slug}">← {prev.metadata.title}</a>
			</div>
		{/if}
		{#if next}
			<div class="next">
				<a href="/diary/{next.slug}">{next.metadata.title} →</a>
			</div>
		{/if}
	</nav>
</article>

<style lang="less">
	header {
		margin-top: 2em;
		margin-bottom: 1em;

		h1 {
			margin: 0;
			line-height: 1.1;
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

		:global(> *) {
			margin: 0;
		}

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

	.post-navigation {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1em;

		&.top {
			margin-top: 2em;
			margin-bottom: 2em;

			.next {
				margin-top: -1em;
				justify-self: flex-end;
				align-self: flex-end;
			}
		}

		&.bottom {
			margin-top: 5em;
		}

		--shadow-offset: 2px;

		.prev {
			--deg: 1deg;
			.rotated-shadow;
			margin-left: -1em;
		}

		.next {
			--deg: -1deg;
			.rotated-shadow;
			align-self: flex-end;
			margin-right: -1em;
		}

		a {
			background-color: rgb(255 255 255);
			text-decoration: none;
			padding: 0.25em 0.75em;
		}
	}
</style>
