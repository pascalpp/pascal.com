<script>
	import Tag from '../Tag.svelte';

	export let data;

	$: ({ post, next, prev } = data);
	$: ({ title, date, content, metadata } = post);
	$: ({ tags } = metadata);

	const dateFormatter = new Intl.DateTimeFormat('en', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const timeFormatter = new Intl.DateTimeFormat('en', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});

	function formatDate(d) {
		const date = new Date(d);
		return dateFormatter.format(date) + ' · ' + timeFormatter.format(date).replace(' ', '').toLowerCase();
	}
</script>

<svelte:head>
	<title>Pascal’s Diary · {title}</title>
</svelte:head>

<header>
	<nav class="post-navigation top">
		{#if prev}
			<div class="prev">
				<a accesskey="[" href="/diary/{prev.slug}">← {prev.metadata.title}</a>
			</div>
		{/if}
		{#if next}
			<div class="next">
				<a accesskey="]" href="/diary/{next.slug}">{next.metadata.title} →</a>
			</div>
		{/if}
	</nav>

	<h1>{title}</h1>
	<div class="subheader">
		<p class="date">{formatDate(date)}</p>
		{#if tags?.length}
			<p class="tags">
				{#each tags as tag}
					<Tag {tag} />
				{/each}
			</p>
		{/if}
	</div>
</header>

<article>
	<svelte:component this={content} />
</article>

<footer>
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
</footer>

<style lang="less">
	header {
		margin-bottom: 1em;

		h1 {
			margin: 0;
			line-height: 1.1;
			font-size: 36px;
			font-weight: 500;
		}

		.subheader {
			font-family: @sans-font;
			border-bottom: 1px solid rgb(0 0 0 / 0.1);
			margin: 0.5em 0;
			margin-left: -0.75em;
			padding: 0.75em;
			padding-right: 3em;
			padding-top: 0;
			width: max-content;
		}

		.tags {
			font-size: 14px;
			:global(> * + *) {
				margin-left: 0.5em;
			}
		}
	}

	article {
		flex-grow: 1;
		font-weight: 200;
		font-size: 20px;
		display: flex;
		flex-direction: column;
		gap: 1em;
		@media @not-mobile {
			min-height: 70vh;
		}

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
			padding: 0.75em;
			background-color: white;
			z-index: 1;
			border-radius: 2px;
			border: 1px solid rgb(0 0 0 / 0.1);
			@media @mobile {
				padding: 0.5em;
				max-width: 90vw;
			}
		}
	}

	.post-navigation {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		&.top {
			margin-bottom: 1em;

			.next {
				justify-self: flex-end;
				align-self: flex-end;
			}
		}

		&.bottom {
			font-size: 20px;
			gap: 1em;
			margin-top: 4em;
		}

		--shadow-offset: 2px;

		.prev {
			--deg: 1deg;
			.rotated-shadow;
		}

		.next {
			--deg: -1deg;
			.rotated-shadow;
			align-self: flex-end;
		}

		@media @not-mobile {
			.prev {
				margin-left: -1em;
				max-width: 60%;
			}
			.next {
				margin-right: -1em;
				max-width: 60%;
			}
		}
		@media @mobile {
			gap: 2em;

			&.top {
				display: none;
			}

			.prev {
				margin-right: 1em;
			}
			.next {
				margin-left: 1em;
			}
		}

		a {
			display: block;
			background-color: rgb(255 255 255);
			text-decoration: none;
			padding: 0.5em 0.75em;
		}
	}
</style>
