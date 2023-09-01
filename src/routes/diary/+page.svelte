<script lang="ts">
	import PostList from './PostList.svelte';

	export let data;
	$: ({ posts } = data);
</script>

<header>
	<p>
		I've had a few different blogs over the years, but they’ve all suffered various database catastrophes. The posts
		below have been resurrected from an old Movable Type blog I wrote in the early 2000s. Soon I'll resurrect the posts
		from my more recent Wordpress blog (which also died), and maybe I’ll write some new posts from time to time.
	</p>
</header>

<article>
	<PostList {posts} />
</article>

<style lang="less">
	header {
		margin-bottom: 1em;
		font-size: 20px;
		font-weight: 200;
	}

	article {
		font-size: 20px;
		font-weight: 200;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
