---
title: Animating SVG
date: 2024-02-23T14:45:26.818Z
status: published
tags: [svg, css, animation]
summary: An experiment with SVG animation, using the `stroke-dasharray` and `stroke-dashoffset` properties in CSS to create fireworks.
mastodon: https://moth.social/@pascal/111984030087238167
---

<script lang="ts">
  import Controls from './controls.svelte';
</script>

Here's a little experiment with SVG animation, using the `stroke-dasharray` and `stroke-dashoffset` properties in CSS to create fireworks.

This SVG has four paths, each made of 12 strokes emanating from a center point.

<Controls/>

Switch to dashed mode and change the size, spacing, and offset of the dashes. Then switch to animated mode to see the fireworks created by animating the `stroke-dashoffset` property.

<aside style="--aside-span: 1">

This particular animation looks better when using a negative offset, so I'm inverting the offset value. I think this has something to do with _path direction_, but that's a topic for another day.

</aside>
