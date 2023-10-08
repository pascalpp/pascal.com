<script lang="ts">
  import { page } from '$app/stores';
</script>

<article>
  <h2>Post not found, or an error occurred.</h2>

  <details open>
    {$page.error?.message}
  </details>
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
