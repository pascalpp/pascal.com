<script lang="ts">
	import Column from '$lib/components/Column.svelte';
	import Row from '$lib/components/Row.svelte';
	import { Body } from 'svelte-body';
</script>

<Body class="homepage" />

<main>
	<Row center>
		<Column>
			<div class="bubbles">
				<div class="bubble header monospace bold">[ the minimalist home page of a person named pascal ]</div>
				<div class="bubble-divider large" />
				<div class="bubble small bold">have a look around:</div>
				<div class="bubble-divider medium" />
				<div class="bubble small">feast your eyes on my resume</div>
				<div class="bubble-divider small" />
				<div class="bubble small">read my diary</div>
				<div class="bubble-divider small" />
				<div class="bubble small">listen to my solo record</div>
				<div class="bubble-divider small" />
				<div class="bubble small">watch some movies I made</div>
				<div class="bubble-divider small" />
				<a href="./software" class="bubble small">download some mac software I wrote</a>
				<div class="bubble-divider large" />
				<div class="bubble small bold">get outta here:</div>
				<div class="bubble-divider medium" />
				<a href="https://www.balthropalabama.com" class="bubble small">check out my small town band</a>
				<div class="bubble-divider large" />
				<div class="bubble small bold">random bits:</div>
				<div class="bubble-divider medium" />
				<div class="bubble-party">
					<a class="bubble small" href="./tools/navigatorproperties.html">navigator properties</a>
					<a class="bubble small" href="./tools/lorem_ipsum.txt">lorem ipsum</a>
					<a class="bubble small" href="./tools/keypress.html">keypress detector</a>
					<a class="bubble small" href="./misc/photomontage/index.html">photo montages</a>
					<a class="bubble small" href="./disco/disco.html">disco!</a>
				</div>
			</div>

			<a href="/">home</a>
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
		font-size: 14px;

		a {
			color: @bubblecolor;
		}
	}

	.bold {
		font-weight: bold;
	}

	.monospace {
		font-family: 'Lucida Console', Monaco, monospace;
	}

	.bubbles {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

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
		font-size: 12px;
		margin-right: 5em;
		&.header {
			padding: 1em 2em;
			border-radius: 2em;
			margin-right: 0em;
			font-size: 14px;
		}
	}

	.bubble-divider {
		background-color: @bubblecolor;
		position: relative;
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
			margin-right: 6.75em;
		}

		&.medium {
			width: 1.25em;
			height: 0.2em;
			margin-right: 6.675em;
		}

		&.large {
			width: 2.75em;
			height: 1em;
			margin-right: 5.875em;
		}
	}

	.bubble-party {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-end;
		margin-right: 5em;
		width: 450px;

		.bubble {
			display: flex;
			margin: 0em;
			white-space: nowrap;
		}

		.bubble + .bubble {
			margin-left: -0.25em;
		}
	}
</style>
