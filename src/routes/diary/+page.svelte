<script lang="ts">
  /* oxlint-disable no-undef, no-unassigned-vars */
  import PostList from './PostList.svelte';

  export let data;
  $: ({ posts } = data);
</script>

<svelte:head>
  <title>Pascal’s Diary</title>
</svelte:head>

<article class="full-width">
  <PostList {posts} />
</article>
