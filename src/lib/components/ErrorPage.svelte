<script lang="ts">
  import Column from '$lib/components/Column.svelte';
  import Card from '$lib/components/Card.svelte';
  import ErrorStar from '$lib/assets/ErrorStar.svelte';
  import Code from './Code.svelte';
  import { page } from '$app/stores';
</script>

<main>
  <div class="error-page">
    <Column center>
      <Card>
        <div class="card-content">
          <Column center gap="12px">
            <div class="error-star">
              <ErrorStar />
            </div>
            <h1 class="error-title"><slot name="title" /></h1>
            <slot />
          </Column>
        </div>
      </Card>

      {#if $page.url.searchParams.has('debug')}
        <Code value={$page.error?.message} />
      {/if}
    </Column>
  </div>
</main>

<style lang="less">
  .error-page {
    padding: 50px;
    min-height: 80vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 640px) {
      padding: 20px;
    }

    .card-content {
      text-align: center;
      padding: 40px;
    }

    .error-star {
      width: 200px;
    }
  }
</style>
