<script lang="ts">
	import Capabilities from './capabilities.md';
	import BroadlyText, { metadata as Broadly } from './broadly.md';
	import AboutDotMeText, { metadata as AboutDotMe } from './aboutdotme.md';
	import SphereText, { metadata as Sphere } from './sphere.md';
	import FreelanceText, { metadata as Freelance } from './freelance.md';
	import SapientText, { metadata as Sapient } from './sapient.md';
	import AdjacencyText, { metadata as Adjacency } from './adjacency.md';
	import EducationText, { metadata as Education } from './education.md';

	let zIndex = 100;
	function bump(event: Event) {
		const target = event.currentTarget as HTMLElement;
		target.style.zIndex = zIndex.toString();
		zIndex++;
	}
</script>

<main>
	<div class="column">
		<button class="business-card" on:focus={bump} on:click={bump}>
			<div class="card">
				<div class="card-content">
					<div class="brackets">&lt;&gt;</div>
					<div class="info">
						pascal
						<br />
						web design and development
						<br />
						<a href="/">https://www.pascal.com/</a>
						<br />
						<a href="mailto:pascal@pascal.com">pascal@pascal.com</a>
					</div>
				</div>
			</div>
		</button>

		<button class="portrait-card" on:focus={bump} on:click={bump}>
			<div class="card">
				<img src="./pascal-portrait.jpg" alt="Pascal Balthrop" />
			</div>
		</button>

		<button class="capabilities-page" on:focus={bump} on:click={bump}>
			<div class="card text-card">
				<Capabilities />
			</div>
		</button>

		<button class="recent-experience-page" on:focus={bump} on:click={bump}>
			<div class="card text-card">
				<h1>Recent experience</h1>

				<h2 class="company">
					<a href={Broadly.url}>{Broadly.company}</a>
					·
					<span class="company-dates">{Broadly.dates}</span>
				</h2>

				<BroadlyText />
			</div>
		</button>

		<button class="past-experience-page" on:focus={bump} on:click={bump}>
			<div class="card text-card">
				<h1>Past experience</h1>

				<h2 class="company">
					<a href={AboutDotMe.url}>{AboutDotMe.company}</a>
					·
					<span class="company-dates">{AboutDotMe.dates}</span>
				</h2>
				<AboutDotMeText />

				<h2 class="company">
					{Sphere.company}
					·
					<span class="company-dates">{Sphere.dates}</span>
				</h2>
				<SphereText />

				<h2 class="company">
					{Freelance.company}
					·
					<span class="company-dates">{Freelance.dates}</span>
				</h2>
				<FreelanceText />

				<h2 class="company">
					{Sapient.company}
					·
					<span class="company-dates">{Sapient.dates}</span>
				</h2>
				<SapientText />

				<h2 class="company">
					{Adjacency.company}
					·
					<span class="company-dates">{Adjacency.dates}</span>
				</h2>
				<AdjacencyText />

				<h2 class="company">
					{Education.company}
					·
					<span class="company-dates">{Education.dates}</span>
				</h2>
				<EducationText />
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

	a {
		color: #000;
		text-underline-offset: 4px;
		text-decoration-color: color-mix(in srgb, currentColor 30%, transparent);
		outline: none;
		&:hover,
		&:focus {
			text-decoration-color: currentColor;
		}
	}

	button {
		outline: none;
		&:focus-within {
			.card {
				outline: 2px solid fade(@blue, 50%);
			}
		}
	}

	.card {
		:global(h1) {
			font-size: 1.3em;
		}

		:global(* + h1) {
			margin-top: 2em;
		}

		:global(h2) {
			margin-top: 1.5em;
		}

		:global(p) {
			margin: 1em 0;
		}

		:global(h2 + p) {
			margin-top: 0.5em;
		}

		:global(ul) {
			padding: 0;
			margin-left: 1.25em;
		}

		:global(li) {
			margin: 0.5em 0;
		}
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 950px;
		margin: 0 auto;

		// select every other child
		> :where(:nth-child(even)) {
			align-self: flex-start;
			margin-right: 1em;
		}
		> :where(:nth-child(odd)) {
			align-self: flex-end;
			margin-left: 1em;
		}
	}

	.card {
		border-radius: 2px;
		background-color: white;
		border: 1px solid fade(black, 50%);
		padding: 1em;
		&.text-card {
			margin-top: -40px;
			max-width: min(600px, 85vw);
			padding: 3em;
			@media @not-desktop {
				margin-top: -20px;
			}
			@media @mobile {
				padding: 2em 1.25em;
			}
		}
	}

	.business-card {
		z-index: 20;
		transition: font-size 0.2s ease-in-out;
		font-size: 16px;
		@media @desktop {
			margin-bottom: -8em;
		}
		@media @mobile {
			font-size: 13px;
		}

		--deg: 5deg;
		--offset: 10px;
		.rotated-shadow;

		.card {
			padding: 1em 6em 1em 2.5em;
			font-family: Andale Mono, Andale, Monaco, Lucida Console, Courier, Sans-Serif;
		}

		.brackets {
			letter-spacing: 2px;
			opacity: 0.3;
			margin-bottom: 2em;
		}
	}

	.portrait-card {
		width: max-content;
		z-index: 1;
		--deg: -3deg;
		--offset: 25px;
		.rotated-shadow;

		img {
			max-width: min(560px, 80vw);
		}
	}

	.capabilities-page {
		--deg: 1deg;
		--offset: 20px;
		.rotated-shadow;
	}

	.recent-experience-page {
		--deg: -2deg;
		--offset: 20px;
		.rotated-shadow;
		@media @desktop {
			margin-left: 3em;
		}
	}

	.past-experience-page {
		--deg: 2deg;
		--offset: 20px;
		.rotated-shadow;
		@media @desktop {
			margin-right: 3em;
		}
	}

	.company-dates {
		font-weight: normal;
	}
</style>
