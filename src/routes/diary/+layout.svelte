<script>
	import { fade } from 'svelte/transition';

	export let data;
</script>

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

	<div class="transition-container">
		{#key data.currentRoute}
			<div class="structure" in:fade={{ duration: 250, delay: 150 }} out:fade={{ duration: 250 }}>
				<slot />
			</div>
		{/key}
	</div>

	<footer>
		<div class="structure">pascal’s diary · copyright about now</div>
	</footer>
</main>

<style lang="less">
	@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200;0,500;1,200;1,500&display=swap');

	.transition-container {
		width: 100%;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
	}

	.transition-container > * {
		grid-row: 1;
		grid-column: 1;
	}

	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		font-family: 'Crimson Pro', serif;
		font-display: block;
		font-weight: 200;
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
			padding-top: 1em;
			padding-left: 3vw;
			border-radius: 4px;
			min-height: 150px;
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
