<script lang="ts">
	import Capabilities from './capabilities.md';
	import RecentExperience from './recent_experience.md';
	import PastExperience from './past_experience.md';
	import Seeking from './seeking.md';

	let zIndex = 100;
	function bump(event: Event) {
		const target = event.currentTarget as HTMLElement;
		target.style.zIndex = zIndex.toString();
		zIndex++;
	}

	function print(event: Event) {
		event.preventDefault();
		window.print();
	}
</script>

<svelte:head>
	<title>Pascal’s Resume</title>
	<meta
		name="description"
		content="Pascal’s Resume - A Brooklyn-based web developer and designer with experience in React, Redux, Node, Sveltekit, HTML, CSS, Less, Sass, and other web technologies." />
</svelte:head>

<main>
	<div class="column">
		<button aria-label="Business Card" class="business-card not-print align-end" on:focusin={bump} on:click={bump}>
			<div class="card">
				<div class="card-content">
					<div class="brackets">&lt;&gt;</div>
					<div class="info">
						pascal
						<br />
						web design and development
						<br />
						<a href="/" data-hint="visit my website">https://www.pascal.com/</a>
						<br />
						<a href="mailto:pascal@pascal.com">pascal@pascal.com</a>
					</div>
				</div>
			</div>
		</button>

		<button aria-label="My Portrait" class="portrait-card not-print align-start" on:focusin={bump} on:click={bump}>
			<div class="card">
				<div class="portrait" />
			</div>
		</button>

		<div class="print-column">
			<div class="resume-header">
				<h1>Pascal Balthrop</h1>
				<h2>Web Developer and Designer</h2>
				<p>Brooklyn, NY</p>
				<p>917-399-7566 · pascal@pascal.com</p>
				<p>
					View this resume online: <a href="https://pascal.com/dev">https://pascal.com/dev</a>
				</p>
			</div>

			<button aria-label="About me" class="capabilities-page align-end" on:focusin={bump} on:click={bump}>
				<div class="card text-card">
					<Capabilities />
				</div>
			</button>

			<button
				aria-label="Recent experience"
				class="recent-experience-page align-start"
				on:focusin={bump}
				on:click={bump}>
				<div class="card text-card">
					<RecentExperience />
				</div>
			</button>
		</div>

		<div class="print-column">
			<button aria-label="Past experience" class="past-experience-page align-end" on:focusin={bump} on:click={bump}>
				<div class="card text-card">
					<PastExperience />
				</div>
			</button>

			<button aria-label="Hire me" class="seeking-page" on:focusin={bump} on:click={bump}>
				<div class="card text-card">
					<Seeking />
				</div>
			</button>
		</div>

		<button aria-label="Print this page" class="print-card not-print" on:click={print}>
			<div class="card">🖨️ Print this resume</div>
		</button>
	</div>
</main>

<style lang="less">
	@blueish: #4f7192;

	main {
		:global(h1) {
			font-size: 1.3em;
		}

		:global(* + h1) {
			margin-top: 2em;
		}

		:global(h2) {
			font-size: 1em;
			margin-top: 1.5em;
			font-weight: normal;
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

	// screen rules
	@media screen {
		:global(body) {
			background-color: color-mix(in srgb, @blueish 70%, white);
			overflow-x: hidden;
		}

		main {
			padding: 2.5em 5em;
			@media @mobile {
				padding: 2em 1em;
			}
			padding-bottom: 20vh;
		}

		:global(a) {
			color: #000;
			text-underline-offset: 4px;
			text-decoration-color: color-mix(in srgb, currentColor 30%, transparent);
			outline: none;
			position: relative;

			&:hover,
			&:focus {
				text-decoration-color: color-mix(in srgb, blue 70%, transparent);
				text-decoration-thickness: 1.5px;
				position: relative;
			}

			&[href*='mailto'] {
				--link-hint: 'email me';
			}
			&[data-hint] {
				--link-hint: attr(data-hint);
			}

			&:focus-visible {
				&::before {
					// css triangle
					content: '';
					position: absolute;
					top: 100%;
					left: 50%;
					transform: translateX(-50%);
					border: 6px solid transparent;
					border-bottom-color: black;
				}
				&::after {
					content: var(--link-hint, 'visit this link');
					position: absolute;
					top: 100%;
					left: 50%;
					transform: translateX(-50%) translateY(11.5px);
					padding: 4px 8px;
					background-color: black;
					color: white;
					border-radius: 4px;
					font-family: @sans-font;
					font-size: 13px;
					white-space: nowrap;
					z-index: 1;
				}
			}
		}

		button {
			outline: none;
			&:focus-within {
				.card {
					outline: 2px solid color-mix(in srgb, blue 25%, transparent);
				}
			}
			&:focus {
				.card {
					outline: 2px solid color-mix(in srgb, blue 50%, transparent);
				}
			}
		}

		.resume-header {
			display: none;
		}

		.column {
			display: flex;
			flex-direction: column;
			align-items: center;
			max-width: 950px;
			margin: 0 auto;

			// stagger items
			.align-start {
				align-self: flex-start;
				margin-right: 1em;
			}
			.align-end {
				align-self: flex-end;
				margin-left: 1em;
			}
		}

		.print-column {
			display: contents;
		}

		.card {
			user-select: text;
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
			z-index: 6;
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
				font-family: @mono-font;
			}

			.brackets {
				letter-spacing: 2px;
				opacity: 0.3;
				margin-bottom: 2em;
			}
		}

		.portrait-card {
			z-index: 5;
			width: min(600px, 80vw);
			--deg: -3deg;
			--offset: 25px;
			.rotated-shadow;

			.portrait {
				width: 100%;
				aspect-ratio: 1.05;
				background-color: #723253;
				background-image: url(./pascal-portrait.jpg);
				background-size: cover;
			}
		}

		.capabilities-page {
			z-index: 4;
			--deg: 1deg;
			--offset: 20px;
			.rotated-shadow;
		}

		.recent-experience-page {
			z-index: 3;
			--deg: -2deg;
			--offset: 20px;
			.rotated-shadow;
			@media @desktop {
				margin-left: 3em;
			}
		}

		.past-experience-page {
			z-index: 2;
			--deg: 2deg;
			--offset: 20px;
			.rotated-shadow;
			@media @desktop {
				margin-right: 3em;
			}
		}

		.seeking-page {
			z-index: 1;
			--link-hint: 'email me';
			--deg: -1deg;
			--offset: 20px;
			.rotated-shadow;
			@media @not-desktop {
				margin-top: 50px;
			}
			@media @desktop {
				margin-top: 20px;
				margin-right: 200px;
			}
		}

		.print-card {
			--deg: -4deg;
			--offset: 20px;
			.rotated-shadow;
			margin-top: 1em;
			margin-left: 4em;
			cursor: pointer;
		}
	}

	// print rules
	@media print {
		.not-print {
			display: none;
		}

		main {
			margin: 40px;
			font-size: 1.05em;
		}

		.column {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-auto-flow: row dense;
			gap: 5em;
			width: 64em;
		}

		button {
			display: contents;
		}

		:global(a) {
			color: #000;
			text-underline-offset: 4px;
		}

		.resume-header {
			margin-bottom: 2em;

			h1 {
				margin: 0;
			}
			h2 {
				margin: 0;
				font-weight: normal;
			}
			p {
				margin: 0;
			}
		}

		.card {
			display: contents;
			:global(a) {
				text-decoration: none;
			}
			:global(h1) {
				margin-top: 2em;
			}
		}

		.capabilities-page {
			:global(h2) {
				font-size: 1.3em;
			}
		}
		.past-experience-page {
			:global(h1) {
				margin-top: 0;
			}
		}
		.seeking-page {
			.card > :global(:last-child) {
				display: none;
			}
		}
	}
</style>
