<script lang="ts">
	import Column from '$lib/components/Column.svelte';
	import Row from '$lib/components/Row.svelte';
	import { Body } from 'svelte-body';
	import Handstand from './images/handstand.svg?component';

	function selectExperiment(event: Event) {
		const target = event.target as HTMLSelectElement;
		document.location = target.value;
	}
</script>

<Body class="homepage" />

<main>
	<Row center>
		<Column right>
			<div class="handstand">
				<Handstand />
			</div>
			<div class="bubbles">
				<div class="bubble header monospace bold">[ the minimalist home page of a person named pascal ]</div>
				<div class="bubble-divider large" />
				<div class="bubble small bold">have a look around:</div>
				<div class="bubble-divider medium" />
				<a data-sveltekit-reload href="./dev/index.html" class="bubble small">feast your eyes on my resume</a>
				<div class="bubble-divider small" />
				<a data-sveltekit-reload href="./diary" class="bubble small">read my diary</a>
				<div class="bubble-divider small" />
				<a data-sveltekit-reload href="./hellomynameis/index.html" class="bubble small">listen to my solo record</a>
				<div class="bubble-divider small" />
				<a data-sveltekit-reload href="./movies/index.html" class="bubble small">watch some movies I made</a>
				<div class="bubble-divider small" />
				<a data-sveltekit-reload href="./software/index.html" class="bubble small">
					download some mac software I wrote
				</a>
				<div class="bubble-divider large" />
				<div class="bubble small bold">get outta here:</div>
				<div class="bubble-divider medium" />
				<a href="https://www.balthropalabama.com" class="bubble small">check out my small town band</a>
				<div class="bubble-divider large" />
				<div class="bubble small bold">random experiments:</div>
				<div class="bubble-divider medium" />
				<div class="bubble small">
					<select on:change={selectExperiment}>
						<option disabled selected>select one ▾</option>
						<option value="./tools/navigatorproperties.html">navigator properties</option>
						<option value="./tools/keypress.html">keypress detector</option>
						<option value="./misc/photomontage/index.html">photo montages</option>
						<option value="./disco/disco.html">disco!</option>
						<option value="./tools/lorem_ipsum.txt">lorem ipsum</option>
					</select>
				</div>
				<div class="bubble-divider tall" />
				<div class="bubble small" style="margin-right:1em">
					I don’t know anything about the computer language which shares my name, so don’t ask!
				</div>
				<div class="bubble-divider medium" />
				<a href="mailto:pascal@pascal.com" class="bubble small">email me</a>
			</div>
		</Column>
	</Row>
</main>

<style lang="less">
	@bgcolor: #336633;
	@textcolor: #000;
	@bubblecolor: #ffffcc;

	:global(body.homepage) {
		background-color: @bgcolor;
		color: @textcolor;
		margin: 0;
		padding: 0;
	}

	main {
		font-family: 'Lucida Grande', Geneva, Helvetica, Arial, Sans-Serif;
		padding: 16px;
		padding-top: 5vh;
		padding-bottom: 15vh;
		font-size: 14px;
		color: @bubblecolor;

		a {
			color: @bubblecolor;
		}
	}

	.handstand {
		width: 200px;
		margin-right: 3em;
	}

	.bold {
		font-weight: bold;
	}

	.monospace {
		font-family: 'Lucida Console', Monaco, monospace;
	}

	.bubbles {
		font-size: 12px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		color: @textcolor;

		a {
			color: @textcolor;
			text-decoration: none;
			&:hover,
			&:active {
				text-decoration: underline;
			}
		}
	}

	.bubble {
		display: block;
		background-color: @bubblecolor;
		padding: 0.5em 1.5em;
		border-radius: 1.5em;
		text-align: right;
		margin-right: 5em;

		@media @mobile {
			margin-right: 1.25em;
		}
		&.header {
			padding: 1em 2em;
			border-radius: 2em;
			margin-right: 0em;
			font-size: 14px;
		}

		select {
			appearance: none;
			background-color: transparent;
			border: none;
			position: relative;
			width: 6em;
			&::after {
				display: block;
				content: '⌄';
				position: absolute;
				right: 0.5em;
				top: 0.5em;
				font-size: 0.75em;
				pointer-events: none;
			}
		}
	}

	.bubble-divider {
		background-color: @bubblecolor;
		position: relative;
		transform: translateX(50%);
		margin-right: 8em;
		@media @mobile {
			margin-right: 5em;
		}

		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 0;
			height: 100%;
			aspect-ratio: 1 / 1;
			background-color: @bgcolor;
			border-radius: 50%;
		}
		&::before {
			left: 0;
			transform: translateX(-50%);
		}
		&::after {
			right: 0;
			transform: translateX(50%);
		}

		&.small {
			width: 1em;
			height: 0;
		}
		&.medium {
			width: 1.5em;
			height: 0.3em;
		}
		&.large {
			width: 3.25em;
			height: 1.25em;
		}
		&.tall {
			width: 0.75em;
			height: 2.5em;
			&::before,
			&::after {
				width: 50%;
				border-radius: 1em;
			}
		}
	}
</style>
