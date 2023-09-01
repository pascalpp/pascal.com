<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ButtonBar from '$lib/components/ButtonBar.svelte';
	import PostList from './PostList.svelte';
	import Tag from './Tag.svelte';

	export let data;
	$: ({ posts, tag } = data);

	let sortOrder = 'newest';

	const sortOptions = [
		{ value: 'oldest', label: 'Oldest' },
		{ value: 'newest', label: 'Newest' },
	];

	function onClickSortOrder(event: MouseEvent) {
		const target = event.target as HTMLButtonElement;
		sortOrder = target.value;
	}
</script>

{#if !tag}
	<header>
		<p>
			I've had a few different blogs over the years, but they’ve all suffered various database catastrophes. The posts
			below have been resurrected from an old Movable Type blog I wrote in the early 2000s. Soon I'll resurrect the
			posts from my more recent Wordpress blog (which also died), and maybe I’ll write some new posts from time to time.
		</p>
	</header>
{/if}

<article>
	<h2>
		<span>
			{#if tag}
				Posts tagged with &nbsp;<Tag {tag} />
			{:else}
				All Posts
			{/if}
		</span>

		<ButtonBar tiny options={sortOptions} selected={sortOrder} on:click={onClickSortOrder} />
	</h2>
	<PostList {posts} {sortOrder} />
</article>

<style lang="less">
	header {
		margin-bottom: 1em;
		font-size: 20px;
		font-weight: 200;
	}

	article {
		h2 {
			font-size: 16px;
			font-family: @sans-font;
			font-weight: normal;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 2em;
		}

		font-size: 20px;
		font-weight: 200;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
