---
title: Building a Svelte modal component using the dialog element
date: 2023-10-27T03:01:01.164Z
tags: [svelte, javascript, dialog]
status: draft
---

<script lang="ts">
  import Dialog from './Dialog.svelte';

  let basicModal: HTMLDialogElement;
  let nestedModal: HTMLDialogElement;
  let nestedModalChild: HTMLDialogElement;
  let modal4: HTMLDialogElement;
</script>

First let's make a barebones Svelte component which renders a dialog element with a slot. We'll export a `modal` property which refers to that dialog element.

```svelte
<script lang="ts">
  // Dialog.svelte
  export let modal: HTMLDialogElement;
</script>

<dialog bind:this={modal}>
  <slot />
</dialog>
```

Then in our page we can import that component and use it to render a dialog with some content. We'll bind that `modal` property to a variable in our page so we can open and close the modal.

```svelte
<script lang="ts">
  import Dialog from './Dialog.svelte';

  let modal: HTMLDialogElement;
</script>

<Dialog bind:modal>
  <h1>Hi there!</h1>
  <button on:click={() => modal.close()}>Close</button>
</Dialog>

<button on:click={() => modal.showModal()}>Open the modal</button>
```

<Dialog bind:modal={basicModal}>
  <h1>Hi there!</h1>
  <button on:click={() => basicModal.close()}>Close</button>
</Dialog>

### Try it out!

<p>
  <button on:click={() => basicModal.showModal()}>Open the modal</button>
</p>

## What you get for free

The native dialog element does a lot for us out of the box (or in it, I suppose).

- The dialog has some basic styling: a white background, a black border, and a backdrop which darkens the rest of the page.
- The dialog is automatically positioned in the center of the viewport, with a slight inset from the left and right edges of the viewport
- If the content of the dialog is longer than the viewport, it will scroll internally, again with a slight inset from the top and bottom of the viewport.
- It traps focus while it is open, allowing you to tab through elements in the dialog. You can tab out of the dialog to focus other elements of the browser window, but other content in your page will not be focusable until the dialog is closed.
- Pressing the escape key automatically closes the dialog.
- You can even open a dialog from within another dialog, and the browser will keep track of which dialog is currently open. Pressing escape will only close one dialog at a time.
- Probably some other built-in niceties that I haven't noticed yet.

<Dialog bind:modal={nestedModal}>
  <h1>Hi there!</h1>
  <p>Cillum nostrud sint esse. Sint esse occaecat mollit incididunt. Occaecat mollit incididunt deserunt lorem eiusmod excepteur. Incididunt deserunt lorem eiusmod excepteur mollit. Lorem eiusmod excepteur mollit. Excepteur mollit reprehenderit excepteur ullamco proident in voluptate.</p>
  <p>
    <button on:click={() => nestedModal.close()}>Close</button>
    <button on:click={() => nestedModalChild.showModal()}>Open another modal</button>
  </p>
  <p>Elit ullamco irure adipiscing, do velit. Adipiscing do velit qui elit minim elit minim. Velit qui, elit minim elit minim. Minim, elit minim incididunt et adipiscing. Incididunt, et adipiscing aliqua. Aliqua, incididunt tempor id deserunt. Id deserunt proident ea eu incididunt mollit quis. Proident ea, eu incididunt mollit.</p>
  <p>Enim proident ad lorem. Ad lorem ullamco anim, ea et. Anim, ea et lorem anim. Lorem, anim anim adipiscing aute. Adipiscing aute est ex mollit cupidatat.</p>
  <p>Occaecat excepteur laborum sint veniam veniam. Laborum sint veniam veniam duis non eu do. Veniam veniam duis non eu, do. Non eu do proident cupidatat, do qui. Proident cupidatat do qui esse eiusmod ut. Do qui esse eiusmod, ut. Eiusmod ut cupidatat voluptate, labore fugiat voluptate occaecat. Voluptate labore fugiat, voluptate occaecat eu ad.</p>
  <p>Veniam culpa aute qui commodo magna ut. Aute qui commodo, magna ut. Magna ut lorem et nisi tempor ex ipsum. Lorem, et nisi tempor. Tempor ex ipsum dolor. Ipsum dolor consectetur est nulla magna aute ut. Consectetur est nulla magna aute. Nulla magna aute ut sed. Aute ut, sed lorem nostrud. Lorem nostrud ex sunt do.</p>
  <p>Consequat irure, commodo minim. Minim, ipsum tempor non. Non in, tempor elit. Elit, id amet dolore. Dolore officia veniam cupidatat id irure, ad ex. Cupidatat, id irure ad ex incididunt ullamco. Ad ex incididunt ullamco consequat, sed. Ullamco consequat, sed commodo.</p>
  <p>Dolor nostrud nisi quis, id. Quis id cupidatat qui, consequat ipsum. Qui consequat ipsum ea eiusmod consequat cupidatat. Ipsum ea, eiusmod consequat cupidatat. Consequat cupidatat incididunt sint duis minim non ad. Incididunt sint duis minim non ad, exercitation exercitation. Minim non, ad exercitation. Exercitation exercitation aute sunt, quis sunt.</p>
  <p>Quis cupidatat aliquip non nostrud laboris. Aliquip non, nostrud laboris commodo velit aliqua duis. Laboris commodo velit aliqua duis consequat dolor. Velit aliqua duis consequat dolor est. Duis consequat, dolor est. Est id in, culpa nulla eu esse sit.</p>
  <p>Amet sed ipsum ut officia, fugiat cillum eu. Ut officia fugiat cillum eu reprehenderit excepteur sit. Fugiat cillum eu reprehenderit excepteur, sit ea. Reprehenderit excepteur sit ea in tempor exercitation sed. Sit, ea in tempor exercitation sed id. Tempor, exercitation sed id amet proident commodo minim. Id amet proident commodo, minim reprehenderit. Commodo minim reprehenderit sed adipiscing reprehenderit proident laborum. Reprehenderit sed adipiscing reprehenderit proident.</p>
  <p>Elit ullamco irure adipiscing, do velit. Adipiscing do velit qui elit minim elit minim. Velit qui, elit minim elit minim. Minim, elit minim incididunt et adipiscing. Incididunt, et adipiscing aliqua. Aliqua, incididunt tempor id deserunt. Id deserunt proident ea eu incididunt mollit quis. Proident ea, eu incididunt mollit.</p>
  <p>Enim proident ad lorem. Ad lorem ullamco anim, ea et. Anim, ea et lorem anim. Lorem, anim anim adipiscing aute. Adipiscing aute est ex mollit cupidatat.</p>
  <p>Occaecat excepteur laborum sint veniam veniam. Laborum sint veniam veniam duis non eu do. Veniam veniam duis non eu, do. Non eu do proident cupidatat, do qui. Proident cupidatat do qui esse eiusmod ut. Do qui esse eiusmod, ut. Eiusmod ut cupidatat voluptate, labore fugiat voluptate occaecat. Voluptate labore fugiat, voluptate occaecat eu ad.</p>
  <p>Veniam culpa aute qui commodo magna ut. Aute qui commodo, magna ut. Magna ut lorem et nisi tempor ex ipsum. Lorem, et nisi tempor. Tempor ex ipsum dolor. Ipsum dolor consectetur est nulla magna aute ut. Consectetur est nulla magna aute. Nulla magna aute ut sed. Aute ut, sed lorem nostrud. Lorem nostrud ex sunt do.</p>
  <p>Consequat irure, commodo minim. Minim, ipsum tempor non. Non in, tempor elit. Elit, id amet dolore. Dolore officia veniam cupidatat id irure, ad ex. Cupidatat, id irure ad ex incididunt ullamco. Ad ex incididunt ullamco consequat, sed. Ullamco consequat, sed commodo.</p>
  <p>Dolor nostrud nisi quis, id. Quis id cupidatat qui, consequat ipsum. Qui consequat ipsum ea eiusmod consequat cupidatat. Ipsum ea, eiusmod consequat cupidatat. Consequat cupidatat incididunt sint duis minim non ad. Incididunt sint duis minim non ad, exercitation exercitation. Minim non, ad exercitation. Exercitation exercitation aute sunt, quis sunt.</p>
  <p>Quis cupidatat aliquip non nostrud laboris. Aliquip non, nostrud laboris commodo velit aliqua duis. Laboris commodo velit aliqua duis consequat dolor. Velit aliqua duis consequat dolor est. Duis consequat, dolor est. Est id in, culpa nulla eu esse sit.</p>
  <p>Amet sed ipsum ut officia, fugiat cillum eu. Ut officia fugiat cillum eu reprehenderit excepteur sit. Fugiat cillum eu reprehenderit excepteur, sit ea. Reprehenderit excepteur sit ea in tempor exercitation sed. Sit, ea in tempor exercitation sed id. Tempor, exercitation sed id amet proident commodo minim. Id amet proident commodo, minim reprehenderit. Commodo minim reprehenderit sed adipiscing reprehenderit proident laborum. Reprehenderit sed adipiscing reprehenderit proident.</p>

  <Dialog bind:modal={nestedModalChild}>
    <h1>Another modal</h1>
    <p>Cillum nostrud sint esse. Sint esse occaecat mollit incididunt. Occaecat mollit incididunt deserunt lorem eiusmod excepteur. Incididunt deserunt lorem eiusmod excepteur mollit. Lorem eiusmod excepteur mollit. Excepteur mollit reprehenderit excepteur ullamco proident in voluptate.</p>
    <p>Elit ullamco irure adipiscing, do velit. Adipiscing do velit qui elit minim elit minim. Velit qui, elit minim elit minim. Minim, elit minim incididunt et adipiscing. Incididunt, et adipiscing aliqua. Aliqua, incididunt tempor id deserunt. Id deserunt proident ea eu incididunt mollit quis. Proident ea, eu incididunt mollit.</p>
    <button on:click={() => nestedModalChild.close()}>Close</button>
  </Dialog>
</Dialog>

<p>
  <button on:click={() => nestedModal.showModal()}>Open a long scrolling modal that has another modal inside it</button>
</p>

## Taking it up a notch

We get so much functionality with the dialog element that we almost don't need to make a separate component. But having done so, we can now add some custom styling and other features to our Dialog component.

Some ideas to try:

- Style the border, background, and backdrop of the dialog
- Set a reasonable max-width
- Add a title bar with a conditional close button
- Animate the modal opening and closing
- Prevent scrolling the page content while the modal is open

<style>
  h1 {
    margin-top: 0;
  }
</style>
