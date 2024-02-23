<script lang="ts">
  import Fireworks from './fireworks.svelte';
  import Row from '$lib/components/Row.svelte';
  import Slider from '$lib/components/Slider.svelte';
  import Column from '$lib/components/Column.svelte';
  import ButtonBar from '$lib/components/ButtonBar.svelte';

  let selected = 'still';
  let options = [
    { value: 'still', label: 'Still' },
    { value: 'dotted', label: 'Dashed' },
    { value: 'animate', label: 'Animated' },
  ];

  function onClick(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    selected = target.value;
  }

  export let dotOffset = 0;
  export let dotSize = 0;
  export let dotDistance = 25;

  $: animate = selected === 'animate';
  $: dotted = selected === 'dotted';
  $: dots = `${dotSize} ${dotDistance}`;
  $: offset = 0 - dotOffset;
</script>

<Fireworks {dotted} {animate} {offset} {dots} />

<div class="controls">
  <Column center gap="2rem">
    <ButtonBar {options} {selected} small rounded on:click={onClick} />
    {#if dotted || animate}
      <Row>
        <Slider id="dot-size" min={0} max={10} step={1} bind:value={dotSize} label="Dash size: {dotSize}" />
        <Slider
          id="dot-distance"
          min={0}
          max={50}
          step={1}
          bind:value={dotDistance}
          label="Dash distance: {dotDistance}"
        />
        <Slider id="dot-offset" min={0} max={1000} step={1} bind:value={dotOffset} label="Offset: {offset}" />
      </Row>
      {#if !animate}
        <Row>
          <pre>
{`svg {
  path {
    stroke-dasharray: ${dots};
    stroke-dashoffset: ${offset};
  }
}`}
      </pre>
        </Row>
      {/if}
      {#if animate}
        <Row>
          <pre>
{`
svg {
  path {
    stroke-dasharray: ${dots};
    animation: draw 3s forwards infinite;
  }
}
@keyframes draw {
  0% {
    opacity: 0;
    stroke-dashoffset: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: ${offset};
    opacity: 0;
  }
}
`}
      </pre>
        </Row>
      {/if}
    {/if}
  </Column>
</div>

<style lang="less">
  .controls {
    font-family: var(--font-sans);
    font-size: 14px;
  }
</style>
