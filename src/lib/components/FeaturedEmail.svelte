<script lang="ts">
	export let attributes: Record<string, string>;
</script>

<div class="featured-email">
	<div class="featured-email-content">
		<h3>Featured email:</h3>
		<div class="email-text">
			<p>
				From: {attributes.from}
				<br />
				Date: {attributes.date}
				<br />
				Subject: {attributes.subject}
				<br />
			</p>

			<slot />
		</div>
	</div>
</div>

<style lang="less">
	@textcolor: #000;
	@bubblecolor: #ffffcc;

	.featured-email {
		margin-top: 1em;
		margin-right: 5em;
		position: relative;

		@media @mobile {
			margin-right: 1em;
		}

		.featured-email-content {
			background-color: @bubblecolor;
			color: @textcolor;
			font-size: 12px;
			box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
			transform: skew(2deg, -2deg) rotateY(20deg);
		}

		&::before {
			display: block;
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			box-shadow: 0 5px 50px rgba(0, 0, 0, 0.25);
			transform: translateY(1em) skew(1deg, 1deg) rotateX(-30deg) rotate(-3deg) scaleX(90%);
		}

		h3 {
			box-shadow: inset 0 -60px 60px -60px rgba(0, 0, 0, 0.15), 0 0 30px rgba(0, 0, 0, 0.15);
			margin: 0;
			padding: 1em 1.5em;
		}
		.email-text {
			font-family: 'Lucida Console', Monaco, monospace;
			padding: 0.5em 1.5em;
		}
	}
</style>
