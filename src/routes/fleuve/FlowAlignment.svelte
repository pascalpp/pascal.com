<script lang="ts">
  import { settings, type FlowAlignment } from './settings.store';

  let button: HTMLButtonElement;
  let topButton: HTMLElement;
  let centerButton: HTMLElement;

  function toggleAspectRatio() {
    if ($settings.flowAlignment === 'top') {
      $settings.flowAlignment = 'center';
    } else {
      $settings.flowAlignment = 'top';
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      centerButton.click();
      centerButton.focus();
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      topButton.click();
      topButton.focus();
    }
  }

  function onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const value = target.dataset.value as FlowAlignment;
    if (value) {
      $settings.flowAlignment = value;
    } else {
      toggleAspectRatio();
    }
    button.focus();
  }
</script>

<div class="flow-alignment">
  <label for="flow-alignment">Flow alignment</label>
  <button
    type="button"
    aria-label="Flow alignment"
    on:keydown={onKeydown}
    on:click={onClick}
    bind:this={button}
    id="flow-alignment"
  >
    <span
      aria-label="Flow alignment: top"
      data-value="top"
      class:active={$settings.flowAlignment === 'top'}
      bind:this={topButton}
    >
      Top
    </span>
    <span
      aria-label="Flow alignment: center"
      data-value="center"
      class:active={$settings.flowAlignment === 'center'}
      bind:this={centerButton}
    >
      Center
    </span>
  </button>
</div>

<style lang="less">
  .flow-alignment {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: stretch;
      border: none;
      padding: 0;
      margin: 0;
      border-radius: 4px;
      border: 1px solid black;
      background-color: #666;
      overflow: hidden;
      width: 80%;
      &:focus,
      &:focus-within {
        outline: 1px solid black;
      }

      span {
        background-color: white;
        outline: none;
        cursor: pointer;
        user-select: none;
        flex-grow: 1;
        text-align: center;
        padding: 0 16px;
        padding: 4px 12px;
        width: 50%;

        + span {
          border-left: 1px solid black;
        }

        &:focus {
          background-color: #f8f8f8;
        }
        &.active {
          background-color: #666;
          color: white;
        }

        &[data-value='center'] {
          :global(svg) {
            transform: rotate(90deg) scaleX(-1);
          }
        }
      }
    }
  }
</style>
