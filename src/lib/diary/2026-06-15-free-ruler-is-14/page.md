---
title: 'Free Ruler is #14!'
date: 2026-06-15T01:23:02.287Z
tags: [free ruler, mac]
summary: 'Free Ruler is now #14 in the free developer tools category in the Mac App Store.'
ogimage: ./dev-tools-free-ruler-ogimage.png
status: published
---

Free Ruler is now #14 in the Mac App Store!

<div class="breakout arrows">

![Free Ruler is #14 in the Mac App Store](./dev-tools-free-ruler.png){: .bordered }

</div>

…in the "Free Developer Tools" category. Some pretty good company in there!

---

You can download Free Ruler from [GitHub](https://github.com/pascalpp/FreeRuler/releases) or the [App Store](https://apps.apple.com/us/app/free-ruler/id1483172210?mt=12).

<style>
  .arrows {
    --arrow-x: 28px;
    --arrow-y: -111px;
    --arrow-size: 3rem;
    position: relative;
    &::before,
    &::after {
      position: absolute;
      bottom: 0;
      color: red;
      font-size: var(--arrow-size);
      font-weight: bold;
      font-family: var(--sans-font);
    }
    &::before {
      content: '→';
      left: 0;
      transform: translateX(calc(var(--arrow-x) * -1)) translateY(var(--arrow-y));
    }
    &::after {
      content: '←';
      right: 0;
      transform: translateX(var(--arrow-x)) translateY(var(--arrow-y));
    }

    @media (width < 800px) {
      width: 320px;
      margin-inline: auto;
      --arrow-x: 20px;
      --arrow-y: -38px;
      --arrow-size: 2rem;
    }
  }
</style>
