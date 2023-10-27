---
title: Building a Svelte modal component using the dialog element
date: 2023-10-27T03:01:01.164Z
tags: [svelte, javascript, dialog]
status: published
---

<script lang="ts">
  import Dialog from './Dialog.svelte';
  import StyledDialog from './StyledDialog.svelte';

  let basicModal: HTMLDialogElement;
  let nestedModal: HTMLDialogElement;
  let nestedModalChild: HTMLDialogElement;
  let styledModal: HTMLDialogElement;
  let styledLongModal: HTMLDialogElement;
</script>

First let's make a barebones Svelte component which renders a dialog element with a slot. We'll export a `modal` property which refers to that dialog element.

`Dialog.svelte`

```svelte
<script lang="ts">
  export let modal: HTMLDialogElement;
</script>

<dialog bind:this={modal}>
  <slot />
</dialog>
```

Then in our page we can import that component and use it to render a dialog with some content. We'll bind that `modal` property to a variable in our page so we can open and close the modal.

`page.svelte`

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
- The dialog is automatically positioned in the center of the viewport, with a slight inset from the left and right edges of the viewport.
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
- Add an optional title bar with a close button
- Animate the modal opening and closing
- Prevent scrolling the page content while the modal is open

Here's a version of the Dialog component with these features added.

<StyledDialog bind:modal={styledModal} let:close title="A styled modal">
  <p>Cillum nostrud sint esse. Sint esse occaecat mollit incididunt. Occaecat mollit incididunt deserunt lorem eiusmod excepteur. Incididunt deserunt lorem eiusmod excepteur mollit. Lorem eiusmod excepteur mollit. Excepteur mollit reprehenderit excepteur ullamco proident in voluptate.</p>
  <p>Elit ullamco irure adipiscing, do velit. Adipiscing do velit qui elit minim elit minim. Velit qui, elit minim elit minim. Minim, elit minim incididunt et adipiscing. Incididunt, et adipiscing aliqua. Aliqua, incididunt tempor id deserunt. Id deserunt proident ea eu incididunt mollit quis. Proident ea, eu incididunt mollit.</p>
</StyledDialog>

<StyledDialog bind:modal={styledLongModal} let:close title="A long styled modal">
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

<p>
  <button on:click={() => styledModal.showModal()}>Open a styled modal</button>
  <button on:click={() => styledLongModal.showModal()}>Open a long styled modal</button>
</p>

<details>
  <summary>The code</summary>

`StyledDialog.svelte`

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  export let modal: HTMLDialogElement;
  export let title: string;

  function close() {
    modal.addEventListener('animationend', afterClosing, { once: true });
    modal.setAttribute('closing', '');
  }

  function afterClosing() {
    modal.removeEventListener('animationend', afterClosing);
    modal.removeAttribute('closing');
    modal.close();
  }

  function onCancel(event: Event) {
    event.preventDefault();
    close();
  }

  onMount(() => {
    modal.addEventListener('cancel', onCancel);

    return () => {
      modal.removeEventListener('cancel', onCancel);
    };
  });
</script>

<dialog bind:this={modal}>
  {#if title}
    <div class="modal-title">
      <h2>{title}</h2>
      <button class="close-button" on:click={close}>&#x2717;</button>
    </div>
  {/if}
  <div class="modal-content">
    <slot {close} />
  </div>
</dialog>

<style lang="less">
  dialog {
    overscroll-behavior: contain;
    border: 1px solid rgba(0 0 0 / 0.3);
    border-radius: 0.5rem;
    box-shadow: 0 4px 10px rgba(0 0 0 / 0.3);
    max-width: min(95vw, 600px);
    padding: 0;

    &::backdrop {
      background-image: linear-gradient(45deg, hsla(0 50% 50% / 0.5), hsla(200 50% 50%/ 0.5));
      backdrop-filter: blur(4px);
    }

    &:is([open]) {
      animation: fade-in 0.2s ease-out, slide-in 0.2s ease-out;
      &::backdrop {
        animation: fade-in 0.2s ease-out;
      }
    }
    &:is([closing]) {
      animation: fade-out 0.2s ease-out, slide-out 0.2s ease-out;
      &::backdrop {
        animation: fade-out 0.2s ease-out;
      }
    }
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
      font-size: 1.25rem;
      border-radius: 4px;
      aspect-ratio: 1;
    }
  }

  .modal-content {
    padding: 1rem;
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

Much of the information and ideas in this post came from these two YouTube videos by CSS Guru Kevin Powell:

- [Dialog: the easiest way to make a popup modal](https://www.youtube.com/watch?v=TAB_v6yBXIE)
- [Animate from display: none](https://www.youtube.com/watch?v=4prVdA7_6u0)

And be sure to check out the [MDN docs for HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement).

<style>
  h1 {
    margin-top: 0;
  }
</style>
