---
title: Building a Svelte modal component using the dialog element
date: 2023-10-27T03:01:01.164Z
tags: [svelte, javascript, dialog]
status: published
---

<script>
  import Dialog from './Dialog.svelte';
  import StyledDialog from './StyledDialog.svelte';

  let basicModal;
  let nestedModal;
  let nestedModalChild;
  let styledModal;
  let styledLongModal;
</script>

First let's make a barebones Svelte component which renders a dialog element with a slot. We'll export a `modal` property which refers to that dialog element.
