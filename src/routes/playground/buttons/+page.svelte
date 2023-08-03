<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ButtonBar from '$lib/components/ButtonBar.svelte';
  import Column from '$lib/components/Column.svelte';
  import Row from '$lib/components/Row.svelte';

  const title = 'Buttons';

  let selected = 'one';
  let options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' },
  ];

  function onClick(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    selected = target.value;
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Column gap="3em">
  <h1>{title}</h1>

  <section>
    <Column>
      <h2>Button types</h2>
      <Row gap="2em">
        <Button label="Unstyled" />
        <Button link label="Link" />
        <Button small primary label="Primary" />
        <Button small secondary label="Secondary" />
        <Button small primary danger label="Primary Danger" />
        <Button small secondary danger label="Secondary Danger" />
      </Row>
    </Column>
  </section>

  <section>
    <Column>
      <h2>Button sizes</h2>
      <p>Optional. If no size is given, button will inherit parent font-size.</p>
      <Row>
        <Button tiny secondary label="Tiny" />
        <Button small secondary label="Small" />
        <Button medium secondary label="Medium" />
        <Button large secondary label="Large" />
      </Row>
    </Column>
  </section>

  <section>
    <Column>
      <h2>Disabled</h2>
      <Row>
        <Button primary disabled label="Primary" />
        <Button secondary disabled label="Secondary" />
        <Button primary danger disabled label="Primary Danger" />
        <Button secondary danger disabled label="Secondary Danger" />
      </Row>
    </Column>
  </section>

  <section>
    <Column>
      <h2>Loading</h2>
      <Row>
        <Button primary loading label="Primary" />
        <Button secondary loading label="Secondary" />
        <Button primary danger loading label="Primary Danger" />
        <Button secondary danger loading label="Secondary Danger" />
      </Row>
    </Column>
  </section>

  <section>
    <Column>
      <h2>ButtonBar</h2>

      <p>
        You can render a ButtonBar with a list of options and a selected value. Use an on:click
        handler to update the selected value with event.target.value.
      </p>
      <ButtonBar {options} {selected} tiny on:click={onClick} />
      <ButtonBar {options} {selected} small on:click={onClick} />
      <ButtonBar {options} {selected} medium on:click={onClick} />

      <p>Or you can render an arbitrary list of Buttons inside ButtonBar.</p>

      <ButtonBar>
        <Button secondary label="A button" />
        <Button secondary label="Another button" />
      </ButtonBar>
    </Column>
  </section>
</Column>
