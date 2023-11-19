<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { Layer } from '$lib/components/Layer.svelte';
  import { getContext } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import Column from '$lib/components/Column.svelte';
  import Row from '$lib/components/Row.svelte';

  const layer: Writable<Layer> = getContext('layer');
  $: ({ cropped, crop, uncrop } = $layer);

  const title = 'Layers';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Column gap="3em">
  <h1>{title}</h1>

  <section>
    <h2>The Layer component renders content in a layer that can be cropped to disable scrolling.</h2>

    <p>The root layout renders all content in a Layer that can be cropped on demand.</p>

    <p>Scroll past these paragraphs and click the buttons.</p>
    <p>
      Mollit voluptate dolore incididunt reprehenderit aliquip pariatur ex. Deserunt do ipsum exercitation anim dolor
      eiusmod excepteur laborum velit esse minim magna reprehenderit. Dolore aliqua in ipsum aliquip nulla. Nisi do
      tempor mollit dolore sint Lorem quis ad elit in.
    </p>
    <p>
      Sit duis deserunt dolore ipsum dolor laborum do. Irure ut elit nisi adipisicing nostrud ad ad pariatur in proident
      irure tempor sit pariatur. Sunt deserunt cupidatat aute reprehenderit ullamco deserunt anim.
    </p>
    <p>
      Sint nostrud non veniam et elit sint quis dolor laboris eu nisi enim. Minim quis voluptate cillum ex eiusmod culpa
      dolore tempor. Aute tempor aute consequat occaecat deserunt tempor labore dolor qui ut incididunt anim. Nostrud
      consequat tempor voluptate cupidatat voluptate consequat laborum nulla deserunt amet. Quis consectetur laborum
      ullamco occaecat deserunt deserunt Lorem qui velit sit fugiat. Proident esse sit quis velit tempor eiusmod amet
      occaecat sit commodo.
    </p>
    <p>
      Tempor cupidatat sint nulla culpa voluptate. Ad fugiat ullamco nisi anim ipsum dolore occaecat labore cillum.
      Adipisicing aute exercitation consequat reprehenderit tempor mollit ullamco culpa reprehenderit amet deserunt
      sunt. Anim proident culpa exercitation irure cupidatat minim incididunt in anim. Ea voluptate reprehenderit
      exercitation irure nisi aliquip et Lorem ad veniam Lorem consectetur. Sunt ipsum in eu consectetur laboris ad aute
      do excepteur qui.
    </p>
    <p>
      Ex laboris mollit in eu laborum ea nulla ipsum non nulla nostrud laborum deserunt consectetur. Elit aliquip ad
      ullamco ea irure nisi do aute quis voluptate adipisicing ut incididunt amet. In ea deserunt tempor ipsum in aute
      mollit. Commodo sit culpa do elit qui exercitation proident consequat ex consectetur Lorem sint aute.
      Reprehenderit aliquip pariatur Lorem non ut sit voluptate nulla. Laborum culpa elit consequat ad nulla ullamco id
      adipisicing. Pariatur non cillum veniam fugiat dolor.
    </p>

    <p>
      <Row>
        <Button primary label="Crop layer" on:click={crop} disabled={cropped} />
        <Button secondary label="Uncrop layer" on:click={uncrop} disabled={!cropped} />
      </Row>
    </p>

    {#if cropped}
      <p>The layer is now cropped. Try scrolling up and down.</p>
    {/if}

    <p>
      Mollit voluptate dolore incididunt reprehenderit aliquip pariatur ex. Deserunt do ipsum exercitation anim dolor
      eiusmod excepteur laborum velit esse minim magna reprehenderit. Dolore aliqua in ipsum aliquip nulla. Nisi do
      tempor mollit dolore sint Lorem quis ad elit in.
    </p>
    <p>
      Sit duis deserunt dolore ipsum dolor laborum do. Irure ut elit nisi adipisicing nostrud ad ad pariatur in proident
      irure tempor sit pariatur. Sunt deserunt cupidatat aute reprehenderit ullamco deserunt anim.
    </p>
    <p>
      Sint nostrud non veniam et elit sint quis dolor laboris eu nisi enim. Minim quis voluptate cillum ex eiusmod culpa
      dolore tempor. Aute tempor aute consequat occaecat deserunt tempor labore dolor qui ut incididunt anim. Nostrud
      consequat tempor voluptate cupidatat voluptate consequat laborum nulla deserunt amet. Quis consectetur laborum
      ullamco occaecat deserunt deserunt Lorem qui velit sit fugiat. Proident esse sit quis velit tempor eiusmod amet
      occaecat sit commodo.
    </p>
    <p>
      Tempor cupidatat sint nulla culpa voluptate. Ad fugiat ullamco nisi anim ipsum dolore occaecat labore cillum.
      Adipisicing aute exercitation consequat reprehenderit tempor mollit ullamco culpa reprehenderit amet deserunt
      sunt. Anim proident culpa exercitation irure cupidatat minim incididunt in anim. Ea voluptate reprehenderit
      exercitation irure nisi aliquip et Lorem ad veniam Lorem consectetur. Sunt ipsum in eu consectetur laboris ad aute
      do excepteur qui.
    </p>
    <p>
      Ex laboris mollit in eu laborum ea nulla ipsum non nulla nostrud laborum deserunt consectetur. Elit aliquip ad
      ullamco ea irure nisi do aute quis voluptate adipisicing ut incididunt amet. In ea deserunt tempor ipsum in aute
      mollit. Commodo sit culpa do elit qui exercitation proident consequat ex consectetur Lorem sint aute.
      Reprehenderit aliquip pariatur Lorem non ut sit voluptate nulla. Laborum culpa elit consequat ad nulla ullamco id
      adipisicing. Pariatur non cillum veniam fugiat dolor.
    </p>
  </section>
</Column>

<style lang="less">
  section {
    max-width: 600px;
  }
</style>
