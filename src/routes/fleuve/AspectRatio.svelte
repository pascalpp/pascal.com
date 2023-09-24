<script lang="ts">
  import { settings, type AspectRatio } from './settings.store';
  import File from './file.svg?component';

  let button: HTMLButtonElement;
  let portraitButton: HTMLElement;
  let landscapeButton: HTMLElement;

  function toggleAspectRatio() {
    if ($settings.aspectRatioType === 'portrait') {
      $settings.aspectRatioType = 'landscape';
    } else {
      $settings.aspectRatioType = 'portrait';
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      landscapeButton.click();
      landscapeButton.focus();
    }
    if (event.key === 'ArrowLeft') {
      portraitButton.click();
      portraitButton.focus();
    }
  }

  function onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const value = target.dataset.value as AspectRatio;
    if (value) {
      $settings.aspectRatioType = value;
    } else {
      toggleAspectRatio();
    }
    button.focus();
  }
</script>

<div class="aspect-ratio">
  <label for="foo">Aspect Ratio</label>
  <button type="button" on:keydown={onKeydown} on:click={onClick} bind:this={button}>
    <span data-value="portrait" class:active={$settings.aspectRatioType === 'portrait'} bind:this={portraitButton}>
      <File />
    </span>
    <span data-value="landscape" class:active={$settings.aspectRatioType === 'landscape'} bind:this={landscapeButton}>
      <File />
    </span>
  </button>
</div>

<style lang="less">
  .aspect-ratio {
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
      &:focus,
      &:focus-within {
        outline: 1px solid black;
      }

      span {
        background-color: white;
        outline: none;
        cursor: pointer;
        user-select: none;
        :global(svg) {
          width: auto;
          height: 20px;
          stroke-width: 1.5;
          pointer-events: none;
        }
        padding: 8px 12px;

        &:focus {
          background-color: #f8f8f8;
        }
        &.active {
          background-color: #666;
          color: white;
        }

        &[data-value='landscape'] {
          :global(svg) {
            transform: rotate(90deg) scaleX(-1);
          }
        }
      }
    }
  }
</style>
