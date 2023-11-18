---
title: Sticky position
date: 2023-11-18T18:16:36.321Z
status: published
---

<style>
  section {
    max-width: min(90vw, 600px);
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color: #f0f0f0;
  }

  .relative {
    position: relative;
  }

  .opacity {
    opacity: 0.9;
  }

  .filter {
    filter: blur(1px);
  }

  .overflow-hidden {
    overflow: hidden;
  }

  .overflow-x-hidden {
    overflow-x: hidden;
  }

  .overflow-y-hidden {
    overflow-x: hidden;
  }

  .overflow-auto {
    overflow: auto;
  }
</style>

This post is just a few experiments with sticky positioning. For the straight dope, visit [CSS Tricks](https://css-tricks.com/video-screencasts/205-sticky-positioning-how-it-works-what-can-break-it-and-dumb-tricks/#aa-what-can-break-it) or [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).

<section>

<h3 class="sticky">This is sticky</h3>

The above header is sticky. As you scroll down, the header will stick to the top of the viewport.

Excepteur eu sunt sunt sed, consectetur non. Sunt sed consectetur, non. Non aliquip qui est irure cupidatat id. Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt.

Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod. Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Culpa reprehenderit labore in irure. Labore in irure sunt laborum. Irure sunt laborum reprehenderit elit, lorem. Reprehenderit elit lorem voluptate. Lorem voluptate fugiat, cupidatat. Cupidatat dolore, adipiscing nostrud. Nostrud minim, deserunt id. Id reprehenderit enim elit minim velit officia magna. Enim elit minim, velit officia. Velit officia magna ullamco commodo aliqua cupidatat et.

</section>

<section class="relative">

<h3 class="sticky">This is sticky inside a relative parent</h3>

The above element is sticky, inside a relative parent. As you scroll down, you'll see that a relative parent doesn't affect sticky positioning.

Excepteur eu sunt sunt sed, consectetur non. Sunt sed consectetur, non. Non aliquip qui est irure cupidatat id. Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

</section>

<section class="opacity">

<h3 class="sticky">This is sticky inside a parent with opacity: 0.9</h3>

The above element is sticky, inside a parent with a custom opacity. As you scroll down, you'll see that opacity doesn't affect sticky positioning.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

</section>

<section class="filter">

<h3 class="sticky">This is sticky inside a parent with a filter</h3>

The above element is sticky, inside a parent with filter: blur(1px). As you scroll down, you'll see that filter doesn't affect sticky positioning.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

</section>

<section class="overflow-hidden">

<h3 class="sticky">This is sticky inside overflow: hidden</h3>

The above element is sticky, inside a parent with overflow: hidden. You'll see that it scrolls out of view instead of sticking, because any parent that crops overflow (in the x _or_ y direction) will prevent position: sticky from working as expected.

Excepteur eu sunt sunt sed, consectetur non. Sunt sed consectetur, non. Non aliquip qui est irure cupidatat id. Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

</section>

<section class="overflow-x-hidden">

<h3 class="sticky">This is sticky inside overflow-x: hidden</h3>

The above element is sticky, inside a parent with overflow-x: hidden. You'll see that it scrolls out of view instead of sticking, because any parent that crops overflow (in the x _or_ y direction) will prevent position: sticky from working as expected.

Excepteur eu sunt sunt sed, consectetur non. Sunt sed consectetur, non. Non aliquip qui est irure cupidatat id. Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

</section>

<section class="overflow-y-hidden">

<h3 class="sticky">This is sticky inside overflow-y: hidden</h3>

The above element is sticky, inside a parent with overflow-y: hidden. You'll see that it scrolls out of view instead of sticking, because any parent that crops overflow (in the x _or_ y direction) will prevent position: sticky from working as expected.

Excepteur eu sunt sunt sed, consectetur non. Sunt sed consectetur, non. Non aliquip qui est irure cupidatat id. Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

</section>

<section class="overflow-auto">

<h3 class="sticky">This is sticky inside overflow: auto</h3>

The above element is sticky, inside a parent with overflow: auto. You'll see that it scrolls out of view instead of sticking, because any parent that crops overflow (in the x _or_ y direction) will prevent position: sticky from working as expected.

Excepteur eu sunt sunt sed, consectetur non. Sunt sed consectetur, non. Non aliquip qui est irure cupidatat id. Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

Qui est irure, cupidatat id mollit occaecat consequat. Cupidatat id mollit occaecat, consequat aute. Occaecat consequat aute incididunt. Aute incididunt culpa elit est, dolore. Elit est dolore, ad ea ullamco in nostrud. Lorem, nulla velit excepteur. Excepteur id culpa commodo ex incididunt consequat. Culpa commodo ex, incididunt consequat irure sunt. Incididunt consequat irure sunt commodo eiusmod.

Irure sunt commodo eiusmod, irure incididunt. Consequat ex consectetur ad, ad qui. Ad ad qui aliqua incididunt cillum dolor proident. Qui aliqua incididunt cillum dolor proident in proident. Incididunt cillum, dolor proident in. Proident in proident nisi. Proident, nisi nostrud laborum officia deserunt. Laborum officia deserunt qui quis reprehenderit aute nulla. Deserunt qui quis reprehenderit aute. Quis reprehenderit aute nulla sint consequat.

Consectetur enim est anim proident. Est anim proident lorem, nostrud. Lorem nostrud occaecat mollit ullamco aliquip occaecat. Occaecat mollit ullamco aliquip occaecat irure. Ullamco aliquip occaecat, irure consectetur. Irure consectetur sit tempor eu. Sit tempor, eu ut duis. Ut duis reprehenderit ipsum fugiat incididunt.

</section>
