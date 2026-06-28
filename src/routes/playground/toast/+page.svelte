<script lang="ts">
  import Toast from '$lib/components/Toast.svelte';
  import Button from '$lib/components/Button.svelte';
  import Column from '$lib/components/Column.svelte';
  import { getContext } from 'svelte';

  const showToast: Function = getContext('showToast');

  const title = 'Toast';

  let toast: Toast;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Column gap="3em">
  <h1>{title}</h1>

  <section>
    <h2>The Toast component shows a temporary banner near the bottom of the window.</h2>
    <p>Access 'showToast' from context and call it with a string.</p>
    <p>
      <Button primary on:click={() => showToast('This is a toast message.')} label="Show toast" />
    </p>
    <p>
      Each new toast message replaces the previous one. Try clicking the button a bunch of times in
      rapid succession.
    </p>
  </section>

  <section>
    <h2>Toast options</h2>
    <p>Pass &lbrace; error: true &rbrace; to show an error toast.</p>
    <p>
      <Button
        primary
        danger
        on:click={() => showToast('This is a toast error.', { error: true })}
        label="Show toast error"
      />
    </p>
  </section>

  <section>
    <h2>Custom content</h2>
    <p>
      You can render the Toast component in your layout to show custom content with a custom
      duration.
    </p>
    <p>
      <Button primary on:click={() => toast.show()} label="Show a toast with custom content" />
    </p>

    <Toast bind:this={toast} let:hide duration={10000}>
      <p>This is a longer toast message.</p>
      <p>With multiple paragraphs!</p>
      <p>And a ten second duration!</p>
      <p>
        Magna id mollit consequat quis magna est mollit Lorem ex mollit. Eu non consectetur aliqua
        irure consequat excepteur veniam laborum et cupidatat. Laboris eu excepteur Lorem esse
        adipisicing tempor non ex cupidatat. Dolor laboris incididunt esse mollit tempor sit qui
        laboris cillum. Sit nulla nulla irure sunt do. Magna reprehenderit adipisicing est aute est
        anim cupidatat proident ex tempor exercitation est incididunt. Nulla ipsum esse duis mollit
        eiusmod cupidatat anim.
      </p>
      <p>
        <Button tiny secondary on:click={hide} label="Click here if you’re impatient" />
      </p>
    </Toast>
  </section>
</Column>
