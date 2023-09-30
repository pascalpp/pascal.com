<script lang="ts">
  const httpRegex = /^((http|https):\/\/)/;

  export let label: string;
  export let loading = false;
  export let disabled: boolean | undefined = undefined;
  export let primary = false;
  export let secondary = false;
  export let danger = false;
  export let success = false;
  export let link = false;
  export let tiny = false;
  export let small = false;
  export let medium = false;
  export let large = false;
  export let wide = false;
  export let bold = false;
  export let nowrap = true;
  export let active = false;

  export let href: string | undefined = undefined;
  export let tag = href ? 'a' : 'button';
  export let external = !!href && httpRegex.test(href);
  export let target = external ? '_blank' : undefined;
  export let rel = external ? 'noopener noreferrer' : undefined;
  export let value: string | number | undefined = undefined;
  export let accesskey: string | undefined = undefined;

  const roundrect = primary || secondary;

  // TypeScript complains about the sveltekit:prefetch attribute being applied to
  // svelte:element. This directive tells the app to prefetch the resources
  // behind a link when the user hovers, which speeds up navigation
  // significantly, but it's only valid on anchor tags. I'm reaching out to
  // Svelte folks to see if there is a resolution to this. For now, ignore the
  // TypeScript warning. (Maybe there's a way to suppress it.)
  // https://svelte.dev/repl/bfbeb5c43f21461c9cbd0fea3cd680cb?version=3.49.0
  // Issue is being triaged here:
  // https://github.com/sveltejs/language-tools/issues/1576
</script>

<svelte:element
  this={tag}
  data-sveltekit-preload-data={href ? true : 'off'}
  {href}
  {rel}
  {target}
  {value}
  {accesskey}
  aria-label={label}
  class="button"
  class:roundrect
  class:link
  class:primary
  class:secondary
  class:danger
  class:success
  class:loading
  class:tiny
  class:small
  class:medium
  class:large
  class:wide
  class:nowrap
  class:active
  class:bold
  disabled={loading || disabled || null}
  role={href ? 'link' : 'button'}
  on:click
>
  <span class="button-content">
    <span class="button-label">
      <slot>{label}</slot>
    </span>
  </span>
</svelte:element>

<style lang="less">
  .button {
    cursor: pointer;
    appearance: none;
    text-align: inherit;
    font-size: inherit;
    line-height: inherit;
    background-color: transparent;
    border: none;
    color: inherit;
    padding: 0;
    margin: 0;
    width: auto;
    height: auto;
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    position: relative;
    vertical-align: baseline;
    box-sizing: border-box;
    text-align: center;
    user-select: none;

    // no outline when clicking buttons
    &:focus:not(:focus-visible) {
      outline: none;
    }
    // show outline when buttons receive keyboard focus
    &:focus-visible {
      outline-color: fade(steelblue, 60%);
      outline-style: auto;
      outline-width: 1px;
      outline-offset: 3px;
    }

    .button-content {
      display: inline-flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      opacity: 1;
      pointer-events: none;
    }

    .button-label {
      pointer-events: none;
    }

    &.nowrap {
      white-space: nowrap;
    }

    &.bold {
      font-weight: bold;
    }

    // link-styled buttons
    &.link {
      color: steelblue;
      vertical-align: text-bottom;
      display: inline;

      // &.has-icon {
      //   display: inline-block;
      // }

      // .icon-left,
      // .icon-right {
      //   position: relative;
      //   width: 1em;
      //   display: flex;
      //   flex-direction: row;
      //   justify-content: center;
      //   align-items: center;
      //   svg,
      //   img {
      //     width: 100%;
      //     height: auto;
      //   }
      // }
      // .icon-left {
      //   margin-right: 0.3em;
      // }
      // .icon-right {
      //   margin-left: 0.3em;
      // }
    }

    // button-styled buttons
    &.roundrect {
      @shadow-distance: 1px;
      padding: 0.5em 1.5em;
      border-radius: 4px;
      box-sizing: border-box;
      color: var(--text-color);
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      box-shadow: 0px @shadow-distance 0 var(--shadow-color);
      transform: translateY(0);

      &[disabled] {
        opacity: 0.3;
        pointer-events: none;
      }

      &:active,
      &[disabled] {
        box-shadow: none;
        transform: translateY(@shadow-distance);
      }

      &.loading {
        .button-content {
          opacity: 0;
        }
        &::before,
        &::after {
          box-sizing: content-box;
          display: block;
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0.9em;
          height: 0.9em;
          border: 0.3em solid currentColor;
          transform: translateX(-50%) translateY(-50%);
          border-radius: 50%;
        }
        &::before {
          opacity: 0.3;
        }
        &::after {
          opacity: 0.5;
          border-right-color: transparent;
          animation: loading-spinner 1s linear infinite;
        }

        @keyframes loading-spinner {
          0% {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
          }
          100% {
            transform: translateX(-50%) translateY(-50%) rotate(360deg);
          }
        }
      }

      @icon-width: 1.25em;
      // .icon-right,
      // .icon-left {
      //   width: @icon-width;
      //   height: 0.75em;
      //   display: flex;
      //   flex-shrink: 0;
      //   flex-direction: row;
      //   justify-content: center;
      //   align-items: center;
      //   svg,
      //   img {
      //     width: 100%;
      //     height: auto;
      //   }
      // }
      // .icon-left {
      //   transform: translateX(-0.75em);
      // }
      // .icon-right {
      //   transform: translateX(0.75em);
      // }

      // .button-label {
      //   text-align: center;
      //   flex: 1;
      // }

      &.tiny {
        font-size: 10px;
      }
      &.small {
        font-size: 12px;
      }
      &.medium {
        font-size: 16px;
      }
      &.large {
        font-size: 18px;
      }

      &.wide {
        width: 100%;

        .button-label {
          // wide buttons have icon margins on the left and right, so the text is
          // centered regardless of the icon
          margin: 0 @icon-width * 1.5;
          &:first-child:last-child {
            // don't need icon margins if we're all alone inside the button
            margin: 0;
          }
        }

        // .icon-left {
        //   margin-right: -@icon-width;
        // }
        // .icon-right {
        //   margin-left: -@icon-width;
        // }
      }

      &.secondary {
        --text-color: fade(black, 60%);
        --background-color: white;
        --border-color: fade(black, 30%);
        --shadow-color: fade(black, 10%);
      }
      // &.outline {
      //   --text-color: steelblue;
      //   --background-color: @button-secondary-fill;
      //   --border-color: steelblue;
      //   --shadow-color: fade(darken(steelblue, 10%), 20%);
      // }
      &.primary {
        @border-color: darken(steelblue, 15%);
        --text-color: white;
        --background-color: steelblue;
        --border-color: @border-color;
        --shadow-color: fade(@border-color, 25%);
      }
      &.secondary.danger {
        --text-color: darken(desaturate(maroon, 20%), 10%);
        --background-color: white;
        --border-color: maroon;
        --shadow-color: fade(darken(maroon, 10%), 20%);
      }
      &.primary.danger {
        @border-color: darken(desaturate(maroon, 25%), 10%);
        --text-color: white;
        --background-color: maroon;
        --border-color: @border-color;
        --shadow-color: fade(@border-color, 25%);
      }
      &.primary.success {
        @border-color: darken(desaturate(green, 25%), 10%);
        --text-color: white;
        --background-color: green;
        --border-color: @border-color;
        --shadow-color: fade(@border-color, 25%);
      }
    }
  }

  :global(a).button {
    text-decoration: none;
  }
</style>
