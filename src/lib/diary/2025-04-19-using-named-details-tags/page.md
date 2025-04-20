---
title: Using named details tags
date: 2025-04-19T18:47:24.030Z
status: draft
summary: A short post about using the `name` attribute on `details` tags to create a simple accordion with no javascript.
tags: [html]
---

You can use the `name` attribute on `details` tags to create a simple accordion with no javascript.

<hr/>

<div class="demo">

<details open name="accordion">
  <summary class="sans">This is a details tag</summary>
  <p>The line above is the summary. This is the content.</p>
  <p>Clicking the summary will hide or show the content.</p>
</details>

<details name="accordion">
  <summary class="sans">The html code for a details tag</summary>

```html
<details open name="accordion">
  <summary>This is a details tag</summary>
  <p>The line above is the summary. This is the content.</p>
</details>
```

</details>

<hr/>

<details name="accordion2">
  <summary class="sans">The open attribute</summary>
  <p>Details tags are collapsed by default. To render an expanded detials tag, add the <code>open</code> attribute.</p>
</details>

<details name="accordion2">
  <summary class="sans">The name attribute</summary>
  <p>Details tags can have a <code>name</code> attribute. Details tags with the same <code>name</code> attribute are mutually-exclusive, so only one can be open at a time.</p>
</details>

<details name="accordion2">
  <summary class="sans">Another details tag with the same name</summary>
  <p>When a details tag is opened, other details tags with the same <code>name</code> attribute will close.</p>
</details>

<details name="accordion2">
  <summary class="sans">And another one</summary>
  <p>This can be used to create a simple accordion with no javascript.</p>
</details>

</div>

<style lang="less">
  details {
    margin-block: 0.75em;
    padding-left: 1.4rem;
  }

  summary {
    cursor: pointer;
    font-weight: 400;
    font-size: 1.2rem;
    margin-left: -1.4rem;
  }

  .demo {
    max-width: 40ch;
  }
</style>
