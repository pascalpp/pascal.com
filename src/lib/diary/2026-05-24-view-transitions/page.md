---
title: View Transitions
date: 2026-05-24T16:09:32.097Z
summary: Animating DOM updates with the View Transitions API.
tags: [css, javascript]
status: published
---

<script lang="ts">
  import Demo from './Demo.svelte';
  import Demo2 from './Demo2.svelte';
</script>

The [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) lets the browser animate between two visual states of the page. When you call `document.startViewTransition()`, the browser captures a snapshot of the current page, runs your update callback to change the DOM, captures a snapshot of the new state, and then cross-fades (or morphs) between them. You get smooth transitions without hand-rolling FLIP animations or measuring every element yourself.

<Demo/>

For same-document updates, pass a callback that mutates the page. The transition does not start until that callback finishes, so the browser always has a consistent “after” snapshot to animate toward.

```javascript
document.startViewTransition(() => {
  colors = shuffle(colors);
});
```

If you are updating the DOM from a framework like Svelte or React, wait for the framework to flush its changes before the callback returns—for example with Svelte’s `tick()`—so the new layout is actually painted before the transition runs.

```javascript
import { tick } from 'svelte';

document.startViewTransition(() => {
  colors = shuffle(colors);
  await tick();
});
```

When several elements move around at once—reordering a list, shuffling a grid—the browser needs a stable identity for each one. Assign a unique `view-transition-name` to every item that should be treated as the “same” element across the old and new states. Matching names get a shared transition group, so a square animates from its old cell to its new cell instead of cross-fading with unrelated squares:

```css
.square {
  view-transition-name: square-e6194b;
}
```

You can also tune timing and easing with the `::view-transition-*` pseudo-elements. Give each element a shared `view-transition-class`, then target that class with the `::view-transition-group` pseudo-element.

```css
.square {
  ...
  view-transition-class: shuffle-square;
}

::view-transition-group(.shuffle-square) {
  animation-duration: 0.25s;
  animation-timing-function: ease-in-out;
}
```

## Animating to a different set of elements

When you animate to a different set of elements, elements that exist in both states will animate from their old position to their new position. New or removed elements will fade in or out. This demo shows 3-9 random color swatches on each shuffle.

<Demo2/>

<div style="height: 50vh;"></div>
