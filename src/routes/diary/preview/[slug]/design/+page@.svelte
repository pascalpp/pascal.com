<script lang="ts">
  import { imageSize } from '../../_layout';
  import PreviewImage from '../../_PreviewImage.svelte';

  export let data;
</script>

<svelte:head>
  <title>Diary Preview Design</title>
</svelte:head>

<div class:compare={data.compare} class="stage">
  <div
    class="preview"
    style="width: {imageSize.width}px; height: {imageSize.height}px;"
  >
    <PreviewImage content={data.content} />
  </div>

  {#if data.compare}
    <img class="rendered" src={data.imageUrl} alt="" width={imageSize.width} height={imageSize.height} />
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    background: #f1eee6;
  }

  .stage {
    min-height: 100vh;
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;
    overflow: auto;
  }

  .preview {
    flex: 0 0 auto;
  }

  .rendered {
    flex: 0 0 auto;
    display: block;
  }

  .compare {
    justify-content: flex-start;
  }
</style>
