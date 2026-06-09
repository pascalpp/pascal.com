# Diary Preview Image Pipeline

This route generates PNG preview images for diary posts:

```text
/diary/preview/:slug
```

The endpoint reads the post metadata for `:slug` and returns a 1200 x 630 PNG suitable for Open Graph previews. Draft posts are hidden in production, matching the diary post behavior.

The preview uses local font files from:

```text
static/fonts/
```

Those files are loaded by both the browser design page and the PNG endpoint so local layout previews can match local generated output. The preview currently registers the diary serif face, `Crimson Pro`, and an explicit OG-renderable sans face, `Inter`, as a close stand-in for the diary's system sans stack.

## Editing the Layout

Do not edit the `ImageResponse` tree by hand.

The editable layout is the Svelte component here:

```text
src/routes/diary/preview/_PreviewImage.svelte
```

That component uses regular Svelte markup and a normal `<style>` block with classes like `.title`, `.summary`, `.panel`, and `.footer`. The component receives this content object:

```ts
{
  title: string;
  summary: string;
  date: string;
  url: string;
}
```

Shared constants and types live in:

```text
src/routes/diary/preview/_layout.ts
```

## Design Preview Page

Use this page to tweak the Svelte layout in the browser:

```text
/diary/preview/:slug/design
```

The design page opts out of the diary layout with `+page@.svelte`, so it renders only the preview canvas. It shows the live Svelte component, not the generated PNG.

To compare the browser-rendered Svelte component against the generated PNG at the same CSS size, add the `compare` query parameter:

```text
/diary/preview/:slug/design?compare=1
```

In development, the PNG endpoint sends `cache-control: no-store`. Compare mode also appends a timestamp query string to the generated PNG URL so browser refreshes pick up layout changes immediately.

In production, diary post pages append `?v=<imageVersion>` to their `og:image` URL. Bump `imageVersion` in `src/routes/diary/preview/_layout.ts` whenever the preview image layout changes and old generated image URLs need to be bypassed.

Diary post pages are prerendered, so `svelte.config.js` sets `kit.prerender.origin` to `https://www.pascal.com`. This is intentionally hardcoded rather than derived from Vercel environment variables, because a deployment can be built under a hashed Vercel URL and later served from the production domain. Without this setting, SvelteKit's request origin is `http://sveltekit-prerender`, which should never appear in published metadata.

To test prerendered metadata locally, set `DEV_PRERENDER_ORIGIN` when building or previewing:

```sh
DEV_PRERENDER_ORIGIN=https://pascal.localhost npm run build
```

Leave `DEV_PRERENDER_ORIGIN` unset for production builds.

In development, `+server.ts` logs timing for each stage to the server console:

```text
[diary preview:slug] fetch post: 1.2ms
[diary preview:slug] render svelte: 0.8ms
[diary preview:slug] inline css: 3.4ms
[diary preview:slug] load fonts: 5.6ms
[diary preview:slug] create image response: 2.1ms
[diary preview:slug] render png: 120.0ms
[diary preview:slug] total: 133.1ms
```

The endpoint only forces `imageResponse.arrayBuffer()` in development so the `render png` timing includes the actual PNG rendering work.

## Server Rendering Flow

`+server.ts` uses this pipeline:

1. `fetchPost(params.slug)` loads diary metadata.
2. The endpoint formats `title`, `summary`, `date`, and `url`.
3. `_PreviewImage.svelte` is rendered on the server with `PreviewImageSsr.render(...)`.
4. Svelte returns two strings: HTML markup and scoped CSS.
5. The endpoint reads the same local font files used by the browser preview. Font reads are cached at module scope.
6. `juice.inlineContent(...)` inlines the CSS into `style` attributes.
7. `satori-html` converts the inlined HTML string into the React-like object shape expected by `@vercel/og`.
8. `new ImageResponse(...)` renders the PNG with the explicit font data.

The local `SsrComponent` type in `+server.ts` exists because TypeScript sees imported `.svelte` files as browser components, while Svelte 4's SSR output also has a `.render(...)` method at runtime.

## CSS Constraints

`@vercel/og`/Satori supports a useful but limited subset of HTML and CSS. Keep layout CSS simple and explicit:

- Prefer `display: flex`, absolute positioning, fixed pixel sizes, and simple typography.
- Avoid relying on browser-only layout features unless you have verified they render in the generated PNG.
- Use the `/design` page for authoring, then check `/diary/preview/:slug` for the actual generated output.
