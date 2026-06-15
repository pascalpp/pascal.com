<script lang="ts">
  import sampleImage from './sample.svg?url';

  export let classes = '';
  export let label = '';
  export let styleText = '';
</script>

<figure class="style-guide-image-example">
  <img class={classes} src={sampleImage} width="360" height="224" alt="Sample landscape" style={styleText} />
  {#if label}
    <figcaption><code>{label}</code></figcaption>
  {/if}
</figure>

<style lang="less">
  .style-guide-image-example {
    min-width: 0;
    margin: 0;
    gap: 0.35rem;
    justify-content: center;
  }

  img {
    width: min(100%, 18rem);
    height: auto;
  }

  figcaption {
    color: rgb(0 0 0 / 0.65);
  }
</style>
