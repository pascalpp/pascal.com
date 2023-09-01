<script lang="ts">
	import ButtonBar from '$lib/components/ButtonBar.svelte';
	import Tag from './Tag.svelte';
	import type { PostSummary } from '../api/posts/util';

	export let posts: PostSummary[] = [];
	export let tag = '';

	let sortOrder = 'newest';

	const sortOptions = [
		{ value: 'oldest', label: 'Oldest' },
		{ value: 'newest', label: 'Newest' },
	];

	function onClickSortOrder(event: MouseEvent) {
		const target = event.target as HTMLButtonElement;
		sortOrder = target.value;
	}

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

<header>
	<span>
		{#if tag}
			Posts tagged with &nbsp;<Tag {tag} />
		{:else}
			All Posts
		{/if}
	</span>

	<ButtonBar tiny options={sortOptions} selected={sortOrder} on:click={onClickSortOrder} />
</header>

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
	header {
		font-size: 16px;
		font-family: @sans-font;
		font-weight: normal;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 2em;
	}

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
