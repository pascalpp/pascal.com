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

<Column>
  <Fireworks {dotted} {animate} {offset} {dots} />

  <div class="controls">
    <Column center gap="2rem">
      <ButtonBar {options} {selected} small rounded on:click={onClick} />
      {#if dotted || animate}
        <div class="sliders">
          <Slider id="dot-size" min={0} max={10} step={1} bind:value={dotSize} label="Dash size: {dotSize}" />
          <Slider id="dot-distance" min={0} max={50} step={1} bind:value={dotDistance} label="Spacing: {dotDistance}" />
          <Slider id="dot-offset" min={0} max={100} step={1} bind:value={dotOffset} label="Offset: {offset}" />
        </div>
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
          {#if dotOffset === 0}
            <p>
              <em>The animation won't do much with a 0 offset. Try increasing the offset amount.</em>
            </p>
          {/if}
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
        {/if}
      {/if}
    </Column>
  </div>
</Column>

<style lang="less">
  .controls {
    font-family: var(--font-sans);
    font-size: 14px;
    container-type: inline-size;
  }

  .sliders {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  @container (inline-size <= 40ch) {
    .sliders {
      flex-direction: column;
    }
  }
</style>
