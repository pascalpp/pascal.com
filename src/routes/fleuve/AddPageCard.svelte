<script lang="ts">
  import type { Page, PageId } from './pages.store';
  import { addConnection, setPageFocus } from './pages.store';
  import { focusCard } from './focusHelpers';

  export let page: Page;
  export let taborder: number;
  export let parentId: PageId | undefined = undefined;
  export let siblingId: PageId | undefined = undefined;

  function onFocus(event: FocusEvent) {
    const target = event.target as HTMLHeadingElement;
    if (window.getSelection && document.createRange) {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    // call with undefined to unfocus the previous page
    setPageFocus();
  }

  function onKeyDown(event: KeyboardEvent) {
    // event.stopPropagation();
    const target = event.target as HTMLElement;
    const title = target.innerText.trim();

    if (event.key === 'Escape' && !title) {
      event.preventDefault();
      target.innerText = '';
      focusCard(siblingId || parentId);
    }

    if (event.key === 'ArrowLeft' && !title) {
      event.preventDefault();
      target.innerText = '';
      focusCard(parentId);
    }

    if (event.key === 'ArrowUp' && !title) {
      event.preventDefault();
      target.innerText = '';
      focusCard(siblingId);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (title) {
        const newPage = addConnection(page, { title });
        target.innerText = '';
        target.blur();
        requestAnimationFrame(() => {
          const el = focusCard(newPage.id);
          el?.click();
        });
      }
    }
  }

  function onKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const title = target.innerText.trim();
    if (!title) target.innerText = title;
  }

  function onBlur(event: FocusEvent) {
    const target = event.target as HTMLElement;
    target.innerText = target.innerText.trim();
  }
</script>

<div class="add-card">
  <h1>
    <span
      id={`add-card-${page.id}`}
      contenteditable="true"
      role="textbox"
      tabindex={taborder}
      class:show={page.active}
      on:focus={onFocus}
      on:blur={onBlur}
      on:keydown={onKeyDown}
      on:keyup={onKeyUp}
    />
  </h1>
</div>

<style lang="less">
  .add-card {
    &:first-child {
      padding-top: 3px;
    }

    h1 span {
      display: block;
      background-color: white;
      box-sizing: border-box;
      border: 1px solid fade(black, 30%);
      padding: 8px 16px;
      border-radius: 4px;
      margin: 0;
      min-width: 100px;
      max-width: 200px;
      appearance: none;
      font-weight: bold;
      white-space: nowrap;
      pointer-events: auto;
      outline: none;
      overflow: auto;

      &::after {
        display: block;
        font-weight: normal;
        content: var(--add-card-placeholder);
        opacity: 0.5;
      }
      &:not(:empty)::after {
        display: none;
      }

      &:focus,
      &:active {
        outline-style: solid;
        outline-width: 2px;
        outline-color: black;
      }
    }
  }
</style>
