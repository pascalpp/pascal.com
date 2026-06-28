<script lang="ts">
  import { browser } from '$app/environment';
  import { createFocusTrap } from 'focus-trap';
  import type { FocusTrap } from 'focus-trap';
  import { onMount } from 'svelte';

  export let top = false;
  export let bottom = false;
  export let left = false;
  export let right = false;
  export let show = false;
  export let taborder = 0;
  export let trapFocus = true;
  export let id: string;
  export let label: string;

  let toolbar: HTMLDivElement;
  let trap: FocusTrap | undefined;

  $: if (show && trapFocus && browser) {
    trap = createFocusTrap(toolbar, {
      escapeDeactivates: true,
      clickOutsideDeactivates: true,
    });
    trap.activate();
  } else {
    trap?.deactivate({ returnFocus: true });
    trap = undefined;
  }

  function toggle() {
    show = !show;
    if (show) {
      document.body.addEventListener('click', onClickOutside);
    } else {
      document.body.removeEventListener('click', onClickOutside);
    }
  }

  function onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!toolbar.contains(target)) {
      show = false;
    }
  }

  function onClick(event: MouseEvent) {
    if (!show) event.stopPropagation();
  }

  function onKeyDownToolbar(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      show = false;
    }
  }

  onMount(() => {
    return () => {
      document.body.removeEventListener('click', onClickOutside);
    };
  });
</script>

<div class="toolbar" class:top class:bottom class:left class:right class:show bind:this={toolbar}>
  <slot>
    <slot name="button" {show} {toggle} {taborder} />
    <div
      {id}
      class="toolbar-panel"
      on:click={onClick}
      on:keydown={onKeyDownToolbar}
      role="menu"
      aria-label={label}
      tabindex={taborder}
    >
      <slot name="panel" {show} {toggle} taborder={show ? taborder : -1} />
    </div>
  </slot>
</div>

<style lang="less">
  .toolbar {
    position: fixed;
    margin: 16px;
    z-index: 1;
    isolation: isolate;
    opacity: 0.5;
    outline: none;
    &:hover,
    &:active,
    &:focus-within,
    &.show {
      opacity: 1;
    }

    .toolbar-panel {
      position: absolute;
      overflow: hidden;
      overflow-y: scroll;
      border: 1px solid black;
      border-radius: 4px;
      background-color: white;
      box-shadow: 0 4px 4px 0 fade(black, 10%);
      opacity: 0;
      max-height: 0;
      pointer-events: none;
      transition: all 0.15s ease-in-out;
      visibility: hidden;
    }

    &.show .toolbar-panel {
      visibility: inherit;
      opacity: 1;
      max-height: 80vh;
      pointer-events: auto;
    }

    &.top {
      top: 0px;
      .toolbar-panel {
        top: 100%;
        margin-top: 4px;
      }
    }
    &.left {
      left: 0px;
    }
    &.right {
      right: 0px;
      .toolbar-panel {
        right: -4px;
      }
    }
    &.bottom {
      bottom: 0px;
      .toolbar-panel {
        bottom: 100%;
        margin-bottom: 12px;
      }
    }

    :global(a) {
      color: black;
      text-decoration: none;
    }
    :global(button) {
      cursor: pointer;
      user-select: none;
    }
  }
</style>
