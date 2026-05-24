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
  import Demo3 from './Demo3.svelte';
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

document.startViewTransition(async () => {
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

When you animate to a different set of elements, elements that exist in both states will animate from their old position to their new position. New or removed elements will fade in or out. This demo shows 3–9 random color swatches on each shuffle.

_Note: each swatch must have a unique `view-transition-name`. The grid below uses the same colors as the demo above, but with a different name prefix so the two grids do not clash when both are on the page._

<Demo2/>

## Customizing the transition

You can also customize the animation that occurs during the view transition. The `::view-transition-group` wrapper is what animates from the old position to the new one. Inside it, `::view-transition-image-pair` holds the old and new snapshots (`::view-transition-old` and `::view-transition-new`).

If you set `animation-name` on the group, it will replace the default move animation entirely—the swatches will show your new animation but will not slide to their new cells. If you put your keyframes on `::view-transition-image-pair` instead, the group pseudo-element will still handle the move animation. You'll probably still want to change the duration and easing of the group transition to match the image pair animation.

The demo below applies a scale and rotation animation to each swatch.

```css
.square {
  ...
  view-transition-class: color-grid-scale;
}

@keyframes shuffle-scale {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(2) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

::view-transition-image-pair(.color-grid-scale) {
  animation: 0.5s ease-in-out shuffle-scale;
}

::view-transition-group(.color-grid-scale) {
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
}
```

<Demo3/>

## Further reading

- [View Transitions API at MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
