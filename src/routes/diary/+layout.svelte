<svelte:head>
	<title>Pascal’s Diary</title>

	<style lang="less">
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

	<div class="structure">
		<slot />
	</div>

	<footer>
		<div class="structure">pascal’s diary · copyright about now</div>
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
		font-family: 'Crimson Pro', serif;
		font-display: block;
		// animation: zoom-fade 1.5s ease-out 0ms forwards;
		// transform-origin: top left;
	}

	:global(a) {
		color: steelblue;
		text-underline-offset: 0.15em;
		text-decoration-thickness: 1px;
	}

	.structure {
		padding: 1em;
		width: min(95vw, 600px);
		margin-left: 250px;
	}

	nav {
		--deg: -2deg;
		.rotated-shadow;
		width: max-content;
		position: fixed;
		left: -1.75vw;
		top: 5vh;

		.card {
			background-color: rgb(255 255 255);
			padding: 1em;
			padding-top: 2vw;
			padding-left: 3vw;
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
			font-weight: 500;
			font-size: 24px;
			color: black;
		}
		a[href='/'] {
			font-family: @sans-font;
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
		padding-top: 8vh;
		padding-bottom: 2vh;
		color: rgb(0 0 0 / 0.3);
	}
</style>
