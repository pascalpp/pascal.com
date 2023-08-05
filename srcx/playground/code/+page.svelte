<script lang="ts">
  import Code from '$lib/components/Code.svelte';
  import Button from '$lib/components/Button.svelte';
  import Column from '$lib/components/Column.svelte';
  import { getContext } from 'svelte';

  const title = 'Code';

  const example = {
    id: 1234,
    name: 'Julius Caesar',
    email: 'julius@caesar.com',
  };
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Column gap="3em">
  <h1>{title}</h1>

  <section>
    <h2>The Code component shows a code snippet in a box.</h2>
    <p>
      <Code value={example} />
    </p>
  </section>
</Column>
