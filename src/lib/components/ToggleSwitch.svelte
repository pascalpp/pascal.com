<script lang="ts">
  let className = '';
  export { className as class };

  type ToggleOptionValue = string | number;

  type ToggleOption = {
    label: string;
    value: ToggleOptionValue;
  };

  const defaultOptions = [
    { value: 'false', label: '' },
    { value: 'true', label: '' },
  ];

  export let name: string;
  export let options: ToggleOption[] = defaultOptions;
  export let value: ToggleOptionValue = options[0].value;
  export let disabled = false;
  export let label: string;

  $: checked = value === options[1].value;
  $: active = checked;

  function getPaddedLabel(option: ToggleOption, options: ToggleOption[]): string {
    const { value, label } = option;
    const otherOption = options.find((other) => other.value !== value) as ToggleOption;
    const difference = label.length - otherOption.label.length ?? 0;
    if (difference >= 0) {
      return label;
    } else {
      // the character below is a non-breaking space (option-spacebar)
      const pad = ' '.repeat(Math.abs(difference));
      return [pad, label, pad].join('');
    }
  }
</script>

<button
  class="toggle-switch {className}"
  class:active
  class:checked
  type="button"
  {name}
  {value}
  {disabled}
  aria-label={label}
  on:click
>
  {#each options as option}
    <span class="toggle-option" class:active={option.value === value}>{getPaddedLabel(option, options)}</span>
  {/each}
</button>

<style lang="less">
  .toggle-switch {
    @transition-time: 200ms;
    appearance: unset;
    background-color: unset;
    border: unset;

    --color: #aaa;
    &.active {
      --color: var(--blue);
    }

    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
    background-color: var(--color);
    box-shadow: 0 0 0 calc(0.1em + 1px) var(--color);
    color: white;
    border-radius: 1.5em;
    padding: 0.05em;
    position: relative;
    overflow: hidden;

    &:focus-within {
      outline-color: color-mix(in srgb, var(--blue) 60%, transparent 60%);
      outline-style: auto;
      outline-width: 1px;
      outline-offset: calc(0.1em + 3px);
    }

    &::before {
      width: 50%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      display: block;
      background-color: white;
      border-radius: 1.5em;
      z-index: 0;
      // using 3D fixes a little visual glitch I was seeing in testing -p
      transform: translate3d(0, 0, 0);
      transition: transform @transition-time ease-in-out;
    }
    &.checked::before {
      transform: translate3d(100%, 0, 0);
    }

    .toggle-option {
      pointer-events: none;
      position: relative;
      overflow: hidden;
      transition: color @transition-time ease-in-out;
      box-sizing: border-box;
      padding: 0.3em 1em;
      color: fade(white, 50%);
      border: none;
      min-height: 1.9em;
      border-radius: 1.5em;
      text-overflow: initial;
      position: relative;
      text-align: center;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      flex: 1;
      flex-shrink: 0;

      &.active {
        color: #999;
      }
    }

    &.active {
      .toggle-option.active {
        color: color-mix(in srgb, var(--blue) 95%, black);
      }
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.3;
    }
  }
</style>
