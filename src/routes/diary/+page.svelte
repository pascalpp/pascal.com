<script lang="ts">
  import PostList from './PostList.svelte';

  export let data;
  $: ({ posts } = data);
</script>

<article class="full-width">
  <PostList {posts} />
</article>
