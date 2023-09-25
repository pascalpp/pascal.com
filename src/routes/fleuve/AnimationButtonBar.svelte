<script lang="ts">
  import { settings } from './settings.store';

  let button: HTMLButtonElement;
  let offButton: HTMLElement;
  let slowButton: HTMLElement;
  let fastButton: HTMLElement;

  const offSpeed = 0;
  const slowSpeed = 0.15;
  const fastSpeed = 0.05;

  const speeds = [slowSpeed, fastSpeed, offSpeed];

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const index = speeds.indexOf($settings.cardAnimationSpeed);
      if (index === speeds.length - 1) return;
      const nextIndex = (index + 1) % speeds.length;
      const nextSpeed = speeds[nextIndex];
      $settings.cardAnimationSpeed = nextSpeed;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const index = speeds.indexOf($settings.cardAnimationSpeed);
      if (index === 0) return;
      const previousIndex = (index - 1 + speeds.length) % speeds.length;
      const previousSpeed = speeds[previousIndex];
      $settings.cardAnimationSpeed = previousSpeed || speeds[0];
    }
  }

  function onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const value = Number(target.dataset.value);
    if (speeds.includes(value)) $settings.cardAnimationSpeed = value;
    button.focus();
  }
</script>

<div class="animation-speed">
  <label for="animation-speed">Animation speed</label>
  <button
    type="button"
    aria-label="Animation speed"
    on:keydown={onKeydown}
    on:click={onClick}
    bind:this={button}
    id="animation-speed"
  >
    <span
      data-value={slowSpeed}
      aria-label="Animation: off"
      class:active={$settings.cardAnimationSpeed === slowSpeed}
      bind:this={slowButton}
    >
      Slow
    </span>
    <span
      data-value={fastSpeed}
      aria-label="Animation: fast"
      class:active={$settings.cardAnimationSpeed === fastSpeed}
      bind:this={fastButton}
    >
      Fast
    </span>
    <span
      data-value={offSpeed}
      aria-label="Animation: slow"
      class:active={$settings.cardAnimationSpeed === offSpeed}
      bind:this={offButton}
    >
      Off
    </span>
  </button>
</div>

<style lang="less">
  .animation-speed {
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
      width: 100%;
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
        width: 33.3333%;

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
