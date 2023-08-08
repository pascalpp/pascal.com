<div class="business-card">
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

<style lang="less">
	.business-card {
		position: relative;
		--deg: 3deg;
		--offest: 10px;
		.rotated-shadow;

		a {
			color: #000;
			text-decoration: none;
		}

		.card-content {
			margin: 0;
			background-color: white;
			border: 1px solid fade(black, 50%);
			border-radius: 2px;
			padding: 1em 6em 1em 2.5em;
			font-family: Andale Mono, Andale, Monaco, Lucida Console, Courier, Sans-Serif;
			z-index: 10;
		}

		.brackets {
			letter-spacing: 2px;
			opacity: 0.3;
			margin-bottom: 2em;
		}
	}
</style>
