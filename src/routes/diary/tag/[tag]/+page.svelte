<script lang="ts">
  import PostList from '../../PostList.svelte';

  export let data;
  $: ({ posts, tag } = data);
</script>

<article class="full-width">
  <PostList {posts} {tag} />
</article>
