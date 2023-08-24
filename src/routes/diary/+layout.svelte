<main class="blog">
	<header>
		<div class="structure">
			<h1>Pascal’s Diary</h1>
			<a href="/">Home</a>
		</div>
	</header>

	<article>
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

	:global(body) {
		background-color: #f0f0f0;
		overflow-x: hidden;
	}

	main {
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
	}

	footer {
		background-image: linear-gradient(to 180deg, rgb(255 255 255 / 0.5), rgb(255 255 255 / 0.5));
	}

	article {
		flex-grow: 1;
		font-family: 'Crimson Pro', serif;
		font-weight: 200;
		font-size: 20px;

		:global(h1),
		:global(h2),
		:global(h3),
		:global(h4),
		:global(h4),
		:global(h4) {
			font-weight: 500;
		}

		:global(.polaroid) {
			width: max-content;
			z-index: 1;
			padding: 1em;
			background-color: white;
			--deg: 2deg;
			.rotated-shadow;
		}
	}
</style>
