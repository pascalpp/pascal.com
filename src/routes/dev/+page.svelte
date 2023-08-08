<script lang="ts">
	import BusinessCard from './BusinessCard.svelte';

	let zIndex = 100;
	function bump(event: Event) {
		const target = event.currentTarget as HTMLElement;
		target.style.zIndex = zIndex.toString();
		zIndex++;
	}
</script>

<main>
	<div class="column">
		<button class="business-card" on:click={bump}>
			<BusinessCard />
		</button>

		<button class="portrait-card" on:click={bump}>
			<div class="card">
				<img src="./pascal-portrait.jpg" alt="Pascal Balthrop" />
			</div>
		</button>

		<button class="capabilities-page" on:click={bump}>
			<div class="card">
				<h1>capabilities</h1>
				<p>I’m a web developer with a focus on user interface design and development.</p>

				<h2>design experience</h2>
				<p>
					My original field of study is Graphic Communication, and building on that I have developed an intuitive,
					user-oriented design sense. I have a knack for design that is appropriate to the needs and goals of the site,
					without pretension and without getting in the way. "Let the damn thing speak for itself."
				</p>
				<h2>technology expertise</h2>
				<p>
					If it relates to front-end web development, I already know it or I can figure it out in short order. Specific
					technologies I deal with regularly: html, xhtml, xml, javascript, dhtml, css, php, perl, etc.
				</p>

				<h2>application and platform experience</h2>
				<p>
					I'm well-versed in Adobe Illustrator, Photoshop, ImageReady, and InDesign. I am also a former beta tester for
					Illustrator and Photoshop.
				</p>
				<p>
					My preferred development platform is Mac OS X, although of course I do extensive testing of my development on
					multiple Windows platforms and on multiple browsers. I'm also very accustomed to working on teams with hybrid
					development environments.
				</p>
				<p>
					My preferred deployment platform is Apache on Linux or BSD, although I can work with your existing deployment
					platform as required.
				</p>
			</div>
		</button>
	</div>
</main>

<style lang="less">
	main {
		padding: 2.5em 5em;
		@media @mobile {
			padding: 2em 1em;
		}
		padding-bottom: 20vh;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;

		// select every other child
		> :nth-child(even) {
			align-self: flex-start;
		}
		> :nth-child(odd) {
			align-self: flex-end;
		}
	}

	.card {
		border-radius: 2px;
		background-color: white;
		border: 1px solid fade(black, 50%);
		padding: 1em;
	}

	.business-card {
		z-index: 20;
		transition: font-size 0.2s ease-in-out;
		font-size: 13px;
		@media @desktop {
			font-size: 16px;
			margin-right: 1em;
			margin-bottom: -10em;
		}
	}

	.portrait-card {
		width: max-content;
		z-index: 1;
		--deg: -3deg;
		--offest: 20px;
		.rotated-shadow;

		.card {
			margin-bottom: -80%;
		}
		img {
			max-width: 600px;
		}
	}

	.capabilities-page {
		z-index: 19;
		--deg: 1deg;
		--offest: 10px;
		.rotated-shadow;
		max-width: 600px;

		.card {
			padding: 5em 3em;
		}
	}

	@media @mobile {
	}
</style>
