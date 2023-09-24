<script lang="ts">
  import PostList from '../../PostList.svelte';

  export let data;
  $: ({ posts, tag } = data);
</script>

<article>
  <PostList {posts} {tag} />
</article>

<style lang="less">
  article {
    font-size: 20px;
    font-weight: 200;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
