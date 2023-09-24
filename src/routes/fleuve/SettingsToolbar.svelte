<script lang="ts">
  import Toolbar from './Toolbar.svelte';
  import Slider from './Slider.svelte';
  import { settings } from './settings.store';
  import FlowAlignmentToggle from './FlowAlignment.svelte';
  import SettingsIcon from './settings.svg?component';
  import ResetButton from './ResetButton.svelte';
  import ShowTutorialButton from './ShowTutorialButton.svelte';
  import AnimationButtonBar from './AnimationButtonBar.svelte';
  // import { onMount } from 'svelte';

  // let show = false;
  // onMount(() => (show = true));

  function getVisbleLabel(opacity: number): string {
    if (opacity === 1) return 'All';
    return String(opacity * 10 + 1);
  }

  $: visibleLabel = getVisbleLabel($settings.childOpacity);
</script>

<Toolbar top right taborder={0} id="settings-menu" label="Settings menu">
  <button
    type="button"
    class="settings-button"
    slot="button"
    let:show
    let:toggle
    let:taborder
    on:click={toggle}
    aria-label="Settings button"
    title="Open settings panel"
    class:show
    tabindex={taborder}
    aria-controls="settings-menu"
    aria-expanded={show}
  >
    <SettingsIcon />
  </button>
  <div class="settings-panel" slot="panel" let:taborder>
    <section class="control">
      <Slider
        id="active-page-scale"
        label={`Large card size: ${$settings.activePageScale}x`}
        min={1}
        max={3}
        step={0.25}
        bind:value={$settings.activePageScale}
        title="Change the scale of active cards"
        {taborder}
      />
    </section>
    <section class="control">
      <Slider
        id="aspect-ratio"
        label={`Aspect ratio: ${$settings.aspectRatio}`}
        min={0.75}
        max={2}
        step={0.05}
        bind:value={$settings.aspectRatio}
        title="Change the shape of active cards"
        {taborder}
      />
    </section>
    <section class="control">
      <Slider
        id="child-opacity"
        label={`Visible layers: ${visibleLabel}`}
        bind:value={$settings.childOpacity}
        title="How many levels to show below the active card"
        {taborder}
      />
    </section>
    <!-- <section class="control">
      <Slider
        id="card-animation-speed"
        label={`Animation speeed: ${$settings.cardAnimationSpeed}s`}
        min={0}
        max={0.5}
        step={0.05}
        bind:value={$settings.cardAnimationSpeed}
        title="Change the speed of card expanstion"
        {tabindex}
      />
    </section> -->
    <section class="control">
      <AnimationButtonBar />
    </section>
    <section class="control">
      <FlowAlignmentToggle />
    </section>
    <!-- <section>
      <AspectRatio />
    </section> -->
    <section class="miscellany">
      <p>
        <a rel="feedback" href="mailto:pascal+fleuve@pascal.com?subject=Fleuve Feedback">
          Send feedback <span class="email-icon" />
        </a>
      </p>
      <ShowTutorialButton />
      <ResetButton />
    </section>
  </div>
</Toolbar>

<style lang="less">
  .settings-button {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid transparent;
    :global(svg) {
      width: 24px;
      height: 24px;
      stroke-width: 1;
    }

    &.show,
    &:hover {
      border: 1px solid fade(black, 30%);
      background-color: white;
    }
    &:focus {
      border: 1px solid fade(black, 30%);
      background-color: white;
      outline: 1px solid black;
    }
  }

  .settings-panel {
    color: black;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 240px;

    section {
      padding: 12px 16px;
      padding-bottom: 16px;
      width: 100%;
      opacity: 0.8;

      &:active,
      &:focus-within {
        opacity: 1;
        &.control {
          background-color: fade(steelblue, 5%);
          box-shadow: inset 0 0 0 1px fade(black, 10%);
        }
      }

      + section {
        border-top: 1px solid fade(black, 10%);
      }
    }
  }

  .miscellany {
    :global(:is(a, button)) {
      opacity: 0.7;
    }
    :global(:is(a, button):hover) {
      opacity: 1;
    }

    .email-icon {
      display: inline-block;
      width: 16px;
      height: 12px;
      border: 1px solid currentColor;
      margin-left: 4px;
      vertical-align: baseline;
      transform: translateY(1px);
      position: relative;
      border-radius: 2px;
      &::before,
      &::after {
        content: '';
        width: 10px;
        height: 1px;
        background-color: currentColor;
        position: absolute;
      }
      &::before {
        left: 0;
        top: 0;
        transform: rotate(40deg);
        transform-origin: top left;
      }
      &::after {
        right: 0;
        top: 0;
        transform: rotate(-40deg);
        transform-origin: top right;
      }
    }
  }
</style>
