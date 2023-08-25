<script>
	export let data;
	const { posts } = data;
	const sorted = posts.reverse();
	console.log(data);
</script>

<header>
	<h1>Pascal’s Diary</h1>
</header>

<article>
	<p>Hi, I’m Pascal. I’m a musician and web developer.</p>
	<p>Here are some of my latest posts:</p>
	<ul>
		{#each sorted as post}
			<li>
				<a href="/diary/{post.slug}">
					<span class="title">{post.metadata.title} →</span>
					<span class="date">{post.metadata.date}</span>
				</a>
			</li>
		{/each}
	</ul>
</article>

<style lang="less">
	header {
		margin-top: 2em;
		margin-bottom: 1em;
	}

	h1 {
		margin: 0;
		line-height: 1.1;
		font-size: 36px;
		font-weight: 500;
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
			padding: 0.5em 1em;
			background-color: white;
			border-radius: 2px;
			text-decoration: none;
			display: flex;
			flex-direction: column;

			.date {
				color: black;
				font-family: @sans-font;
				opacity: 0.5;
				font-size: 12px;
				padding-left: 0.5em;
			}
		}
	}
</style>
