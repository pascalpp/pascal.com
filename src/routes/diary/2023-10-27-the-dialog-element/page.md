---
title: Building a Svelte modal dialog component using the dialog element
date: 2023-10-27T03:01:01.164Z
tags: [svelte, javascript, dialog]
status: published
summary: The dialog element is a native HTML element that provides a lot of built-in functionality for creating modal dialogs. By wrapping it in a Svelte component, we can add custom styling and other features.
---

<script lang="ts">
  import Dialog from './Dialog.svelte';
  import StyledDialog from './StyledDialog.svelte';
  import styledDialogText from './StyledDialog.svelte?raw';

  let basicDialog: HTMLDialogElement;
  let nestedDialog: HTMLDialogElement;
  let nestedDialogChild: HTMLDialogElement;
  let styledDialog: StyledDialog;
  let styledDialogLong: StyledDialog;
  let styledDialogUntitled: StyledDialog;
  let closeUntitledModal: () => void;
</script>

First let's make a barebones Svelte component which renders a dialog element with a slot. We'll export a `dialog` property which refers to that dialog element.

<details open>
  <summary><code>Dialog.svelte</code></summary>

```svelte
<script lang="ts">
  export let dialog: HTMLDialogElement;
</script>

<dialog bind:this={dialog}>
  <slot />
</dialog>
```

</details>

Then in our page we can import that component and use it to render a dialog with some content. We'll bind that `dialog` property to a variable in our page so we can open and close the dialog.

<details open>
  <summary><code>page.svelte</code></summary>

```svelte
<script lang="ts">
  import Dialog from './Dialog.svelte';

  let dialog: HTMLDialogElement;
</script>

<Dialog bind:dialog>
  <h1>Hi there!</h1>
  <button on:click={() => dialog.close()}>Close</button>
</Dialog>

<button on:click={() => dialog.showModal()}>Open the modal</button>
```

</details>

<Dialog bind:dialog={basicDialog}>
  <h1>Hi there!</h1>
  <button on:click={() => basicDialog.close()}>Close</button>
</Dialog>

### Try it out!

<p>
  <button on:click={() => basicDialog.showModal()}>Open the modal</button>
</p>

## What you get for free

The native dialog element does a lot for us out of the box (or in it, I suppose).

- The dialog has some basic styling: a white background, a black border, and a backdrop which darkens the rest of the page.
- The dialog is automatically positioned in the center of the viewport.
- If the content of the dialog is longer than the viewport, it will scroll internally, with a slight inset from the top and bottom of the viewport.
- It traps focus while it is open, allowing you to tab through elements in the dialog. You can tab out of the dialog to focus other elements of the browser window, but other content in your page will not be focusable until the dialog is closed.
- Pressing the escape key automatically closes the dialog.
- You can even open a dialog from within another dialog, and the browser will keep track of which dialog is currently open. Pressing escape will only close one dialog at a time.
- Probably some other built-in niceties that I haven't noticed yet.

<Dialog bind:dialog={nestedDialog}>
  <h1>Hi there!</h1>
  <p>Cillum nostrud sint esse. Sint esse occaecat mollit incididunt. Occaecat mollit incididunt deserunt lorem eiusmod excepteur. Incididunt deserunt lorem eiusmod excepteur mollit. Lorem eiusmod excepteur mollit. Excepteur mollit reprehenderit excepteur ullamco proident in voluptate.</p>
  <p>
    <button on:click={() => nestedDialog.close()}>Close</button>
    <button on:click={() => nestedDialogChild.showModal()}>Open another modal</button>
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

  <Dialog bind:dialog={nestedDialogChild}>
    <h1>Another modal</h1>
    <p>Cillum nostrud sint esse. Sint esse occaecat mollit incididunt. Occaecat mollit incididunt deserunt lorem eiusmod excepteur. Incididunt deserunt lorem eiusmod excepteur mollit. Lorem eiusmod excepteur mollit. Excepteur mollit reprehenderit excepteur ullamco proident in voluptate.</p>
    <p>Elit ullamco irure adipiscing, do velit. Adipiscing do velit qui elit minim elit minim. Velit qui, elit minim elit minim. Minim, elit minim incididunt et adipiscing. Incididunt, et adipiscing aliqua. Aliqua, incididunt tempor id deserunt. Id deserunt proident ea eu incididunt mollit quis. Proident ea, eu incididunt mollit.</p>
    <button on:click={() => nestedDialogChild.close()}>Close</button>
  </Dialog>
</Dialog>

<p>
  <button on:click={() => nestedDialog.showModal()}>Open a long scrolling modal with a nested modal</button>
</p>

## Taking it up a notch

We get so much functionality with the dialog element that we almost don't need to make a separate component. But having done so, we can now add some custom styling and other features to our Dialog component.

Some ideas to try:

- Style the border, background, and backdrop of the dialog
- Set a reasonable max-width
- Add an optional title bar with a close button
- Animate the modal opening and closing
- Prevent scrolling the page content while the modal is open

Here's a version of the Dialog component with some of these features added.

<details open>
  <summary><code>StyledDialog.svelte</code></summary>

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  export let title: string | undefined = undefined;
  export let element: HTMLDialogElement;

  // Export a custom open function that calls the dialog element's showModal method.
  export function open() {
    element.showModal();
  }

  // Export a custom close function that sets a closing attribute on the dialog
  // element. This attribute is used to trigger the closing animation. So we add
  // a listener for animationend which calls the afterClosing method below. By
  // passing once: true, we don't have to remove this event listener.
  export function close() {
    element.addEventListener('animationend', afterClosing, { once: true });
    element.setAttribute('closing', '');
  }

  // When the closing animation completes, we can remove the closing attribute
  // and call the dialog's native close method.
  function afterClosing() {
    element.removeAttribute('closing');
    element.close();
  }

  // When the user presses the escape key, the browser calls the dialog's close
  // method directly, bypassing our nice closing animation. So we can listen for
  // the 'cancel' event, prevent its default behavior, and call our custom close
  // method instead.
  function onCancel(event: Event) {
    event.preventDefault();
    close();
  }

  // When the component mounts, add our event listener, and remove it on dismount.
  onMount(() => {
    element.addEventListener('cancel', onCancel);

    return () => {
      element.removeEventListener('cancel', onCancel);
    };
  });
</script>

<dialog bind:this={element}>
  {#if title}
    <div class="modal-title">
      <h2>{title}</h2>
      <button class="close-button" on:click={close}>&#x2717;</button>
    </div>
  {/if}
  <div class="modal-content">
    <slot />
  </div>
</dialog>

<style lang="less">
  // just using less for nesting syntax

  dialog {
    overscroll-behavior: contain;
    border: 1px solid rgba(0 0 0 / 0.3);
    border-radius: 0.5rem;
    box-shadow: 0 4px 10px rgba(0 0 0 / 0.3);
    max-width: min(95vw, 600px);
    padding: 0;

    // animate when the dialog opens
    &:is([open]) {
      animation: fade-in 0.2s ease-out, slide-in 0.2s ease-out;
      &::backdrop {
        animation: fade-in 0.2s ease-out;
      }
    }
    // animate when the dialog is closing
    &:is([closing]) {
      animation: fade-out 0.2s ease-out, slide-out 0.2s ease-out;
      &::backdrop {
        animation: fade-out 0.2s ease-out;
      }
    }

    // add a gradient and blur filter to the backdrop pseudo-element
    &::backdrop {
      background-image: linear-gradient(45deg, hsla(0 50% 50% / 0.5), hsla(200 50% 50%/ 0.5));
      backdrop-filter: blur(4px);
    }

    .modal-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(0 0 0 / 0.1);
      font-size: 24px;
      position: sticky;
      top: 0;
      background-color: white;

      h2 {
        margin: 0;
      }

      .close-button {
        appearance: none;
        border: none;
        background: none;
        border: none;
        box-shadow: none;
        font-size: 1.25rem;
        border-radius: 4px;
        padding: 0;
        width: 2em;
        text-align: center;
        aspect-ratio: 1;
      }
    }

    .modal-content {
      padding: 1rem;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
</style>
```

</details>

### Using the styled dialog component in a page

<details open>
  <summary><code>page.svelte</code></summary>

```svelte
<script lang="ts">
  import StyledDialog from './StyledDialog.svelte';

  // Our local dialog variable is now an instance of the custom
  // component instead of an HTMLDialogElement
  let dialog: StyledDialog;
</script>

<!-- Using bind:this to bind the component instance to our local dialog variable -->
<StyledDialog bind:this={dialog} title="Hi there!">
  <p>Nulla amet anim laboris enim aute. Anim laboris...</p>
</StyledDialog>

<!-- Now we can call the exported open method on the dialog instance -->
<button on:click={() => dialog.open()}>Open the dialog</button>
```

</details>

### Try it out

<StyledDialog bind:this={styledDialog} title="Hi there!">
  <p>
    Nulla amet anim laboris enim aute. Anim laboris enim aute mollit. Ipsum enim et esse, ut. Esse ut id minim. Id minim, dolore aute. Aute minim magna, mollit ut. Mollit ut commodo, excepteur non nulla culpa. Nostrud aliqua elit non est est id. Elit non est est id consequat irure sint. Est est id consequat irure sint aliqua do. Id consequat irure sint, aliqua do sint magna. Sint aliqua do, sint magna sit consectetur ex. Sint magna sit consectetur ex, amet sunt veniam. Consectetur ex amet sunt veniam.
  </p>
</StyledDialog>

<StyledDialog bind:this={styledDialogLong} let:close title="A long styled modal">
  <p>Cillum nostrud sint esse. Sint esse occaecat mollit incididunt. Occaecat mollit incididunt deserunt lorem eiusmod excepteur. Incididunt deserunt lorem eiusmod excepteur mollit. Lorem eiusmod excepteur mollit. Excepteur mollit reprehenderit excepteur ullamco proident in voluptate.</p>
  <p>Elit ullamco irure adipiscing, do velit. Adipiscing do velit qui elit minim elit minim. Velit qui, elit minim elit minim. Minim, elit minim incididunt et adipiscing. Incididunt, et adipiscing aliqua. Aliqua, incididunt tempor id deserunt. Id deserunt proident ea eu incididunt mollit quis. Proident ea, eu incididunt mollit.</p>
  <p>Elit ipsum pariatur sit, nostrud occaecat ipsum. Sit nostrud occaecat ipsum cillum. Occaecat ipsum cillum ut ex amet, aliqua duis. Ut ex amet, aliqua. Aliqua duis, excepteur excepteur veniam. Excepteur veniam excepteur deserunt in eu.</p>
  <p>Ipsum, ad qui nulla. Nulla do sit, duis. Duis voluptate fugiat aliquip minim nostrud, ad. Aliquip minim nostrud ad quis. Nostrud ad quis, dolore proident. Dolore, proident cupidatat commodo et sit sit id. Commodo et sit sit id cupidatat. Sit sit id cupidatat laboris deserunt. Id cupidatat laboris deserunt incididunt dolore, deserunt est. Deserunt incididunt dolore, deserunt est cillum tempor.</p>
  <p>Minim amet occaecat duis, elit. Duis elit et anim labore amet sed. Et, anim labore amet sed amet. Amet sed amet veniam occaecat, sunt sit veniam. Veniam occaecat sunt sit veniam, ut tempor. Sit veniam, ut tempor. Tempor sed, ipsum cillum ea.</p>
  <p>Anim cillum elit incididunt proident ut nostrud nisi. Elit incididunt proident ut nostrud nisi aute commodo. Proident ut nostrud, nisi aute commodo enim. Nisi, aute commodo enim. Enim laboris tempor officia. Tempor officia ad mollit. Ad mollit occaecat id. Occaecat id eu, nulla ullamco irure in adipiscing.</p>
  <p>Est anim sint, et. Et fugiat, aliqua excepteur sunt et sint exercitation. Excepteur sunt et sint. Et, sint exercitation eu culpa. Eu culpa tempor, veniam. Veniam eu, laboris laborum. Laborum enim adipiscing laboris commodo amet pariatur.</p>
  <p>Proident voluptate veniam irure duis deserunt. Veniam irure duis deserunt. Duis deserunt ad veniam reprehenderit deserunt commodo eiusmod. Ad veniam reprehenderit deserunt. Reprehenderit deserunt commodo eiusmod proident labore. Commodo eiusmod proident labore sit sed. Proident labore sit sed esse nisi. Sit sed, esse nisi nisi.</p>
  <p>Commodo deserunt magna ea in veniam et, commodo. Ea in veniam et commodo, est ut. Et commodo est ut nisi labore veniam ad. Est ut nisi labore veniam ad adipiscing. Nisi labore veniam ad adipiscing lorem cillum. Veniam, ad adipiscing lorem cillum nostrud sed.</p>
  <p>Nisi qui culpa velit dolore eiusmod quis fugiat. Culpa velit dolore eiusmod quis, fugiat elit ut. Eiusmod quis fugiat elit ut aliquip excepteur commodo. Fugiat elit ut, aliquip. Aliquip excepteur commodo consectetur do. Commodo consectetur, do ullamco ut. Ullamco ut ex, sed eu. Sed eu aute tempor velit sunt. Aute tempor velit sunt est ut aute ut. Velit sunt, est ut aute ut.</p>
  <p>Quis ullamco culpa ad cillum commodo est. Culpa ad cillum commodo est ullamco ex culpa. Cillum commodo est ullamco ex culpa, pariatur. Ullamco ex culpa pariatur id sunt, ut sit. Pariatur id sunt ut sit culpa pariatur mollit. Sunt ut sit, culpa.</p>
</StyledDialog>

<StyledDialog bind:this={styledDialogUntitled}>
  <p>This modal has no title. But we can access its custom close method to create our own <button on:click={styledDialogUntitled.close}>close button</button>.</p>
</StyledDialog>

<p>
  <button on:click={styledDialog.open}>Open a styled modal</button>
  <button on:click={styledDialogLong.open}>Open a long styled modal</button>
  <button on:click={styledDialogUntitled.open}>Open an untitled modal</button>
</p>

Much of the information and ideas in this post came from these two YouTube videos by CSS guru Kevin Powell:

- [Dialog: the easiest way to make a popup modal](https://www.youtube.com/watch?v=TAB_v6yBXIE)
- [Animate from display: none](https://www.youtube.com/watch?v=4prVdA7_6u0)

And be sure to check out the [MDN docs for HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement).

_Addendum: this post was updated on November 18th, 2023 to use `bind:this` so that we can access the exported open/close methods on the component instance._

<style>
  h1 {
    margin-top: 0;
  }
</style>
