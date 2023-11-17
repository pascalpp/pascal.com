---
title: Dots and Spokes
date: 2023-11-17T20:51:36.166Z
status: published
---

<script lang="ts">
  import DotsAndSpokes from './DotsAndSpokes.svelte';

  let spokes = 8;
  let circlespeed = 10;
  let dotspeed = 4;

  function example1() {
    spokes = 12;
    circlespeed = 15;
    dotspeed = 1;
  }

  function example2() {
    spokes = 20;
    circlespeed = 7;
    dotspeed = 1.3;
  }

  function example3() {
    spokes = 3;
    circlespeed = 15;
    dotspeed = 1;
  }

  function defaultExample() {
    spokes = 8;
    circlespeed = 10;
    dotspeed = 4;
  }
</script>

Decided to migrate [this old codepen I did](https://codepen.io/pascalpp/pen/VLJjQx) to a blog post in order to feel like I got something productive done today. It's a little hypnotic. Try dragging the sliders around, or try <button class="link" on:click={example1}>this one</button> or <button class="link" on:click={example2}>this one</button> or <button class="link" on:click={example3}>this one</button> or <button class="link" on:click={defaultExample}>the default</button>.

<div class="container">
  <DotsAndSpokes bind:spokes bind:dotspeed bind:circlespeed/>
</div>

<details>
  <summary>The code</summary>

`DotsAndSpokes.svelte`

```svelte
<script lang="ts">
  import Column from '$lib/components/Column.svelte';
  import Slider from '$lib/components/Slider.svelte';

  let spokes = 8;
  let dotspeed = 4;
  let circlespeed = 10;
</script>

<Column center --circlespeed={circlespeed + 's'} --dotspeed={dotspeed + 's'}>
  {#key spokes}
    <div class="circle">
      {#each new Array(spokes) as spoke, i}
        <div class="spoke" style="transform: rotate({(180 / spokes) * i}deg)">
          <div class="dot" style="animation-delay: {(i * 2) / spokes}s" />
        </div>
      {/each}
    </div>
  {/key}

  <div class="controls">
    <Column>
      <Slider bind:value={spokes} min={1} max={20} step={1} id="spokes" label="Number of spokes: {spokes}" />
      <Slider bind:value={circlespeed} min={1} max={20} id="circlespeed" label="Wheel Speed: {circlespeed}s" />
      <Slider bind:value={dotspeed} min={1} max={10} id="dotspeed" label="Dot Speed: {dotspeed}s" />
    </Column>
  </div>
</Column>

<style lang="less">
  .circle {
    width: 300px;
    height: 300px;
    border: 10px solid;
    border-radius: 50%;
    animation: fullrotation var(--circlespeed, 10s) infinite linear;
    position: relative;
  }

  .circle .spoke {
    width: 1px;
    height: 100%;
    background-color: #000;
    position: absolute;
    left: 50%;
    top: 0;
  }
  .circle .spoke .dot {
    position: absolute;
    display: block;
    background-color: #000;
    content: '';
    left: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    animation: spokedot var(--dotspeed, 14s) infinite ease-in-out;
    box-shadow: 0 0 0 2px black;
  }

  .controls {
    width: 200px;
    font-family: @sans-font;
    font-size: 14px;
  }

  @keyframes spokedot {
    0%,
    100% {
      top: 0px;
      background-color: blue;
    }
    16.6667% {
      background-color: green;
    }
    33.3333% {
      background-color: yellow;
    }
    50% {
      top: calc(100% - 20px);
      background-color: orange;
    }
    66.6667% {
      background-color: red;
    }
    83.3333% {
      background-color: purple;
    }
  }

  @keyframes fullrotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
```

</details>

<style lang="less">
  .container {
    margin: 2rem 0;
    width: fit-content;
  }
</style>
