<svelte:head>
	<style>
		body {
			background-color: #f0f0f0;
			overflow-x: hidden;
		}
	</style>
</svelte:head>

<main>
	<nav>
		<div class="card">
			<a href="/diary">Pascal’s Diary</a>
			<a href="/">⬅ Home</a>
		</div>
	</nav>

	<article class="blog-article">
		<div class="structure column">
			<slot />
		</div>
	</article>

	<footer>
		<div class="structure">pascal’s diary · copyright now</div>
	</footer>
</main>

<style lang="less">
	@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200;0,500;1,200;1,500&display=swap');

	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		animation: zoom-fade 1.5s ease-out 0ms forwards;
		transform-origin: top left;
	}

	:global(a) {
		color: steelblue;
		text-underline-offset: 0.15em;
		text-decoration-thickness: 1px;
	}

	.structure {
		padding: 1em;
		width: min(95vw, 600px);
		// margin: 0 auto;
		margin-left: 240px;
	}

	.column {
		:global(> *) {
			margin: 0;
		}
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	nav {
		--deg: -2deg;
		.rotated-shadow;
		width: max-content;
		position: fixed;
		left: -1vw;
		top: -1vw;

		.card {
			background-color: rgb(255 255 255);
			padding: 1em;
			padding-top: 2vw;
			padding-left: 2vw;
			border-radius: 4px;
			min-height: 200px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		a {
			text-decoration: none;
			color: @blue;
		}
		a[href='/diary'] {
			font-family: 'Crimson Pro', serif;
			font-weight: 500;
			font-size: 24px;
			color: black;
		}
	}

	@keyframes zoom-fade {
		0% {
			opacity: 0;
			scale: 10;
		}
		100% {
			opacity: 1;
			scale: 1;
		}
	}

	footer {
		font-family: 'Crimson Pro', serif;
		padding-top: 8vh;
		padding-bottom: 2vh;
		color: rgb(0 0 0 / 0.3);
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
