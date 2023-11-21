---
title: Container queries
date: 2023-11-20T17:53:31.546Z
status: published
tags: [css]
---

<script lang="ts">
  import Box from './Box.svelte';
</script>

<style>
  .container {
    container-name: container;
    container-type: inline-size;
  }

  .inset {
    max-width: 40ch;
    margin-left: 4rem;
  }
</style>

A little playground to experiment with container queries. Try resizing the window or switching to responsive mode in your browser.

<div class="container">
  <Box title="Content"/>
</div>

<div class="container inset">
  <Box title="Inset"/>
</div>

<div class="container bleed-left">
  <Box title="Bleed left"/>
</div>

<div class="container bleed-right">
  <Box title="Bleed right"/>
</div>

<div class="container bleed">
  <Box title="Bleed"/>
</div>
