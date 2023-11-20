<script lang="ts">
  import PostList from './PostList.svelte';

  export let data;
  $: ({ posts } = data);
</script>

<article class="full-width">
  <PostList {posts} />
</article>

<style lang="less">
  article {
    font-size: 20px;
    font-weight: 200;
    margin-top: 2rem;
  }
</style>
