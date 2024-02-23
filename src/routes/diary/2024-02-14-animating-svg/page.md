---
title: Animating SVG
date: 2024-02-23T14:45:26.818Z
status: published
tags: [svg, css, animation]
---

<script lang="ts">
  import Controls from './controls.svelte';
</script>

Here's a little experiment with SVG animation. You can use the `stroke-dasharray` and `stroke-dashoffset` properties in CSS to achieve various effects with SVG paths, including animation.

Here's an SVG with four paths, each made of 12 strokes emanating from a center point. Two of them have `stroke-width: 3` and the other two have `stroke-width: 1`. All of them have rounded ends with `stroke-linecap: round`.

<Controls/>

Switch to dotted mode and change the size, distance, and offset of the dots. And then switch to animated mode to see the fireworks, by animating the `stroke-dashoffset` property.
