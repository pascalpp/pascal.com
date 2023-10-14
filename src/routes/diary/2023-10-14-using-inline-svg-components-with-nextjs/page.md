---
title: Using inline SVG components with NextJS
date: 2023-10-14T01:29:10.797Z
tags: [react, nextjs, svg]
status: draft
---

Today I decided to try out [NextJS](https://nextjs.org) for the first time. One of the first things I like to test out when trying a new framework is how it handles SVGs and other assets.

<details>
  <summary>A little rant</summary>

_In so many apps I've worked on, images and other assets are treated as second-class citizens, relegated to some root-level assets directory where they may or may not get used, just sitting there collecting dust. I much prefer to treat assets as first-class dependencies and colocate them next to the components that use them. This allows the file structure of the app to express these relationships more clearly, so it's obvious what images are being used by which parts your application or website. This is especially useful if you're jumping among different projects, where you might not work on a given project for months at a time and then have to come back and refamiliarize yourself._

</details>

A big part of my process for building web applications is to render SVG icons inline, rather than loading them with `<img src"some-icon.svg" />`. Having them inline allows them to inherit color from the parent node, and also allows you to style them with CSS, apply CSS variables, all that good stuff.

Out of the box, NextJS allows importing SVGs, but as far as I can tell those imports are primarily meant to be used as `src` props for the NextJS `Image` component. So I did some <span title="Fuck Google">DuckDuckGoing</span> for 'nextjs inline svg' and found this handy package: [svgr](https://react-svgr.com).

They have [instructions for modifying your NextJS config](https://react-svgr.com/docs/next/) but those didn't work for me; the NextJS app kept complaining that there was no loader configured. But cribbing from there I was able to figure out this solution, and I thought it might help someone else who's stumbling down this same path.

## Add a rule to your NextJS webpack config

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
      resourceQuery: /component/, // *.svg?component
    });

    return config;
  },
};

module.exports = nextConfig;
```

With this rule, importing an SVG as a component is opt-in, using `?component` as a query string on the path, leaving the existing NextJS SVG rules alone.

## Usage

```jsx
import SomeIcon from './some-icon.svg?component'

export default App() {
  return (
    <SomeIcon/>
  )
}
```

## TypeScript bonus

Finally, if you're using TypeScript, you'll want to declare a module for this import type. I put this in src/types.ts:

```typescript
declare module '*.svg?component' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
```

Doing that gets you nice autocomplete for passing SVG props to your SVG components:

![SVG Autocomplete](./svg-autocomplete.png){ .polaroid }

"You, now · Uncommitted." Haha.
