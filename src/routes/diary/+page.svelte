<script>
	export let data;
	const { posts } = data;
	const sorted = posts.reverse();

	const dateFormatter = new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	function formatDate(d) {
		try {
			const date = new Date(d);
			return dateFormatter.format(date);
		} catch (e) {
			console.log(d);
			return d;
		}
	}
</script>

<header>
	<p>
		I've had a few different blogs over the years, but they’ve all suffered various databse catastrophes. The posts
		below have been resurrected from an old Movable Type blog I wrote in the early 2000s. Soon I'll resurrect the posts
		from my more recent Wordpress blog (which also died), and maybe I’ll write some new posts from time to time.
	</p>
</header>

<article>
	<ul>
		{#each sorted as post}
			<li>
				<a href="/diary/{post.slug}">
					<span class="title">{post.metadata.title}</span>
					<span class="date">{formatDate(post.metadata.date)}</span>
				</a>
			</li>
		{/each}
	</ul>
</article>

<style lang="less">
	header {
		margin-top: 2em;
		margin-bottom: 1em;
		font-size: 20px;
		font-weight: 200;
	}

	article {
		font-size: 20px;
		font-weight: 200;
	}

	ul,
	li {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul {
		margin-top: 2em;
		width: max-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5em;
	}

	li {
		width: max-content;
		&:nth-child(odd) {
			--deg: 1deg;
			margin-left: -1em;
		}
		&:nth-child(even) {
			--deg: -1deg;
			margin-left: 1em;
		}

		--shadow-offset: 0.1em;
		--shadow-size: -1px;
		.rotated-shadow;

		a {
			max-width: 500px;
			padding: 0.5em 1em;
			background-color: white;
			border-radius: 2px;
			text-decoration: none;
			display: flex;
			flex-direction: column;
			gap: 0.25em;
			line-height: 1.2;

			.title {
				&::after {
					content: ' →';
				}
			}

			.date {
				color: black;
				font-family: @sans-font;
				opacity: 0.5;
				font-size: 12px;
				padding-left: 2em;
			}
		}
	}
</style>
