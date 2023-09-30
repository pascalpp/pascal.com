<script lang="ts">
  import PostList from './PostList.svelte';

  export let data;
  $: ({ posts } = data);
</script>

<header>
  <p>
    Most of the posts below have been resurrected from an old Movable Type blog I wrote in the early 2000s. I'm also
    gradually re-adding the posts from my more recent Wordpress blog, and maybe I’ll write some new posts from time to
    time.
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
