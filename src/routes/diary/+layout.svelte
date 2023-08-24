<main class="blog">
	<header>
		<div class="structure">
			<h1>Pascal’s Diary</h1>
			<a href="/">Home</a>
		</div>
	</header>

	<article class="blog-article">
		<div class="structure">
			<slot />
		</div>
	</article>

	<footer>
		<div class="structure">Some end of page stuff here</div>
	</footer>
</main>

<style lang="less">
	@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200;0,500;1,200;1,500&display=swap');

	main {
		overflow-x: hidden;
		background-color: #f0f0f0;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
	}

	.structure {
		padding: 1em;
		width: min(95vw, 600px);
		margin: 0 auto;
	}

	header {
		background-color: rgb(255 255 255 / 0.5);
		position: sticky;
		.structure {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	footer {
		padding-top: 8vh;
		padding-bottom: 2vh;
	}

	.blog-article {
		flex-grow: 1;
		font-family: 'Crimson Pro', serif;
		font-display: swap;
		font-weight: 200;
		font-size: 20px;

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

		:global(.polaroid) {
			margin-left: 1em;
			width: max-content;
			.rotated-shadow;
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
