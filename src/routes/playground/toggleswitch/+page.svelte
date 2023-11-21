<script lang="ts">
  import Column from '$lib/components/Column.svelte';
  import Row from '$lib/components/Row.svelte';
  import ToggleSwitch from '$lib/components/ToggleSwitch.svelte';

  const title = 'Toggle Switch';

  let basicValue = 'true';
  function toggleBasicValue() {
    basicValue = basicValue === 'false' ? 'true' : 'false';
  }

  const labeledToggleOptions = [
    { value: 'false', label: 'Bad' },
    { value: 'true', label: 'Good' },
  ];
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Column gap="2em">
  <h1>{title}</h1>

  <section>
    <p>Basic on/off toggle</p>
    <ToggleSwitch name="basic-toggle" label="Basic toggle" value={basicValue} on:click={toggleBasicValue} />
  </section>

  <section>
    <p>With labels</p>
    <ToggleSwitch
      name="toggle-with-labels"
      label="Toggle with labels"
      value={basicValue}
      options={labeledToggleOptions}
      on:click={toggleBasicValue}
    />
  </section>

  <section>
    <p>Inherits font size</p>
    <Row>
      <div style="font-size: 4px">
        <ToggleSwitch name="basic-toggle" label="Basic toggle" value={basicValue} on:click={toggleBasicValue} />
      </div>
      <div style="font-size: 6px">
        <ToggleSwitch name="basic-toggle" label="Basic toggle" value={basicValue} on:click={toggleBasicValue} />
      </div>
      <div style="font-size: 8px">
        <ToggleSwitch name="basic-toggle" label="Basic toggle" value={basicValue} on:click={toggleBasicValue} />
      </div>
      <div style="font-size: 10px">
        <ToggleSwitch name="basic-toggle" label="Basic toggle" value={basicValue} on:click={toggleBasicValue} />
      </div>
      <div style="font-size: 12px">
        <ToggleSwitch name="basic-toggle" label="Basic toggle" value={basicValue} on:click={toggleBasicValue} />
      </div>
      <div style="font-size: 14px">
        <ToggleSwitch name="basic-toggle" label="Basic toggle" value={basicValue} on:click={toggleBasicValue} />
      </div>
      <div style="font-size: 16px">
        <ToggleSwitch name="basic-toggle" label="Basic toggle" value={basicValue} on:click={toggleBasicValue} />
      </div>
      <div style="font-size: 18px">
        <ToggleSwitch name="basic-toggle" label="Basic toggle" value={basicValue} on:click={toggleBasicValue} />
      </div>
    </Row>
  </section>
</Column>
