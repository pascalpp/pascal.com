<script lang="ts">
  import { page } from '$app/stores';
</script>

<article class="full-width">
  <h2>Post not found, or an error occurred.</h2>

  <details open>
    {$page.error?.message}
  </details>
</article>

<style lang="less">
  article {
    padding-top: 4rem;
  }
</style>
