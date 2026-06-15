export type StyleGuideSnippet = {
  id: string;
  name: string;
  token: string;
  description: string;
  snippet: string;
};

export const layoutSnippets: StyleGuideSnippet[] = [
  {
    id: 'breakout',
    name: '.breakout',
    token: '.breakout',
    description: 'Expands an element into the narrow breakout columns on both sides of the reading column.',
    snippet: `<section class="breakout">

### Breakout heading

Extra emphasis without going edge to edge.

</section>`,
  },
  {
    id: 'breakout-left',
    name: '.breakout-left',
    token: '.breakout-left',
    description: 'Pulls the left edge into the left breakout column while keeping the right edge aligned to content.',
    snippet: `<p class="breakout-left">
  A small left-leaning note or callout.
</p>`,
  },
  {
    id: 'breakout-right',
    name: '.breakout-right',
    token: '.breakout-right',
    description: 'Keeps the left edge aligned to content and extends the right edge into the breakout column.',
    snippet: `<p class="breakout-right">
  A small right-leaning note or callout.
</p>`,
  },
  {
    id: 'bleed',
    name: '.bleed',
    token: '.bleed',
    description: 'Lets an element occupy the full diary grid from the left edge to the right edge.',
    snippet: `<div class="bleed" style="max-width: 1400px; padding-inline: 2rem;">

![Description](./image.png){: .polaroid loading=lazy width=1200 }

</div>`,
  },
  {
    id: 'bleed-left',
    name: '.bleed-left',
    token: '.bleed-left',
    description: 'Extends the left edge to the full-width start while preserving the normal right edge.',
    snippet: `<div class="bleed-left">
  Content that should lean hard to the left.
</div>`,
  },
  {
    id: 'bleed-right',
    name: '.bleed-right',
    token: '.bleed-right',
    description: 'Extends the right edge to the full-width end while preserving the normal left edge.',
    snippet: `<div class="bleed-right">

<MyWideDemo />

</div>`,
  },
  {
    id: 'full-width',
    name: '.full-width',
    token: '.full-width',
    description:
      'Creates a full grid band that still provides the normal content, breakout, and bleed columns inside it.',
    snippet: `<div class="full-width">

Content inside this band can still use diary grid helpers.

<aside style="grid-column: content-end / full-width-end">
  A side note can sit in the right rail of a .full-width element.
</aside>

</div>`,
  },
];

export const structureSnippets: StyleGuideSnippet[] = [
  {
    id: 'aside',
    name: '<aside>',
    token: '<aside>',
    description: 'Creates a side note on wide screens and a bordered inset note on smaller screens.',
    snippet: `<aside style="--aside-span: 3">

### aside content

</aside>`,
  },
];

export const imageSnippets: StyleGuideSnippet[] = [
  {
    id: 'polaroid',
    name: '.polaroid',
    token: '.polaroid',
    description: 'Adds the white photo border, small rotation, and shadow used throughout older photo posts.',
    snippet: `![Description](./image.png){: .polaroid loading=lazy width=800 }`,
  },
  {
    id: 'centered',
    name: '.centered',
    token: '.centered',
    description: 'Centers the item by turning its parent into a small flex column.',
    snippet: `![Description](./image.png){: .centered loading=lazy width=600 }`,
  },
  {
    id: 'bordered',
    name: '.bordered',
    token: '.bordered',
    description: 'Adds a subtle border to screenshots and UI images.',
    snippet: `![Description](./screenshot.png){: .bordered loading=lazy }`,
  },
  {
    id: 'padded',
    name: '.padded',
    token: '.padded',
    description: 'Adds white padding behind transparent or edge-to-edge images.',
    snippet: `![Description](./image.png){: .padded loading=lazy }`,
  },
  {
    id: 'polaroid-centered',
    name: '.polaroid .centered',
    token: '.polaroid .centered',
    description: 'A common combination for a centered, framed image.',
    snippet: `![Description](./image.png){: .polaroid .centered loading=lazy width=800 }`,
  },
  {
    id: 'custom-style',
    name: 'custom style',
    token: 'style=""',
    description: 'Sets one-off CSS variables or inline styles in the Markdown image attributes.',
    snippet: `![Description](./image.png){: .polaroid style="--polaroid-deg: 5deg; --shadow-offset: 0.75em;" loading=lazy width=800 }`,
  },
];

export const allSnippets = [...layoutSnippets, ...structureSnippets, ...imageSnippets];

const snippetsById = new Map(allSnippets.map(snippet => [snippet.id, snippet]));

export function getStyleGuideSnippet(id: string) {
  return snippetsById.get(id);
}
