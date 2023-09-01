<script lang="ts">
	import type { PostSummary } from '../api/posts/util';

	export let posts: PostSummary[] = [];
	export let sortOrder: string;

	$: sorted = posts.slice().sort((a, b) => {
		const reverse = sortOrder === 'newest';
		const multiplier = reverse ? 1 : -1;
		if (b.metadata.date < a.metadata.date) return -1 * multiplier;
		if (b.metadata.date > a.metadata.date) return 1 * multiplier;
		return 0;
	});

	const dateFormatter = new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	function formatDate(timestamp: string) {
		try {
			const date = new Date(timestamp);
			return dateFormatter.format(date);
		} catch (e) {
			console.log(timestamp);
			return timestamp;
		}
	}
</script>

<ul>
	{#each sorted as post}
		<li>
			<a href="/diary/{post.slug}">
				<span class="title">{post.metadata.title}</span>
				<span class="date">{formatDate(post.metadata.date)}</span>
			</a>
		</li>
	{/each}
</ul>

<style lang="less">
	ul,
	li {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul {
		margin-top: 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5em;
	}

	li {
		width: max-content;
		max-width: 95w;
		&:nth-child(odd) {
			--deg: 1deg;
			margin-left: -1em;
		}
		&:nth-child(even) {
			--deg: -1deg;
			margin-left: 1em;
		}

		--shadow-offset: 0.1em;
		--shadow-size: -1px;
		.rotated-shadow;

		a {
			max-width: min(85vw, 500px);
			padding: 0.5em 1em;
			background-color: white;
			border-radius: 2px;
			text-decoration: none;
			display: flex;
			flex-direction: column;
			gap: 0.25em;
			line-height: 1.2;

			.title {
				&::after {
					content: ' →';
				}
			}

			.date {
				color: black;
				font-family: @sans-font;
				opacity: 0.5;
				font-size: 12px;
				padding-left: 2em;
			}
		}
	}
</style>
