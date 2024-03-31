---
title: Understanding height in CSS
date: 2024-03-20T04:27:54.376Z
status: draft
tags: [css]
---

<script lang="ts">
  import { onMount } from 'svelte';
  import Row from '$lib/components/Row.svelte';

  let el: HTMLElement | null = null;
</script>

## How height is determined

In most cases, the height of an element is the sum of the height of its children, plus any vertical (block) padding.

<Row center>
<div style="box-shadow: 0 0 0 1px black; inline-size: max-content; margin-top: 1rem; font-family: var(--sans-font)" bind:this={el}>
  <div style="height: 70px; background-color: red; color: white; align-content: center; padding-inline: 1rem">Child 1: height 70px</div>
  <div style="height: 50px; background-color: green; color: white; align-content: center; padding-inline: 1rem">Child 2: height 50px</div>
  <div style="height: 30px; background-color: blue; color: white; align-content: center; padding-inline: 1rem">Child 3: height 30px</div>
</div>

{#if el}

<div style="font-family: var(--sans-font)">
  Parent height: {el?.offsetHeight}px
</div>

{/if}

</Row>
