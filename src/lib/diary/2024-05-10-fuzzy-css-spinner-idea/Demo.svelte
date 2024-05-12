<script lang="ts">
  import { onMount } from 'svelte';
  import CssSpinner, { defaultConfig, type SpinnerConfig } from './CssSpinner.svelte';

  let config: SpinnerConfig = {
    ...defaultConfig,
    red: true,
    blue: false,
    green: false,
  };

  function setDefaults() {
    config = {
      ...defaultConfig,
    };
  }

  function whiteLotus() {
    config = {
      ...defaultConfig,
      border1: 0,
      border2: 0,
      border3: 0,
      border4: 0,
      corner1: 15,
      corner2: 85,
      corner3: 20,
      corner4: 75,
    };
  }

  function bouncyFlower() {
    config = {
      ...defaultConfig,
      border1: 0,
      border2: 0,
      border3: 0,
      border4: 100,
      corner1: 90,
      corner2: 20,
      corner3: 90,
      corner4: 20,
      rotate: 120,
      translate: 0,
      delay: 0,
    };
  }

  function vennFootballs() {
    config = {
      ...defaultConfig,
      border1: 100,
      border2: 100,
      border3: 100,
      border4: 100,
      corner1: 90,
      corner2: 20,
      corner3: 90,
      corner4: 20,
      rotate: 0,
      translate: 0,
      speed: 9,
      delay: 3,
    };
  }

  function example2() {
    config = {
      ...defaultConfig,
      border1: 38,
      border2: 5,
      border3: 6,
      border4: 38,
      corner1: 87,
      corner2: 94,
      corner3: 95,
      corner4: 96,
      blur: 3,
    };
  }

  function pulsingCircle() {
    config = {
      ...defaultConfig,
      border1: 38,
      border2: 5,
      border3: 6,
      border4: 38,
      corner1: 100,
      corner2: 100,
      corner3: 100,
      corner4: 100,
    };
  }

  function chaosPie() {
    config = {
      ...defaultConfig,
      border1: 0,
      border2: 80,
      border3: 34,
      border4: 0,
      corner1: 38,
      corner2: 67,
      corner3: 34,
      corner4: 68,
      size: 300,
      rotate: 60,
      translate: 0,
      speed: 9,
      delay: 3,
      blur: 3,
    };
  }

  function example4() {
    config = {
      ...defaultConfig,
      border1: 29,
      border2: 59,
      border3: 24,
      border4: 0,
      corner1: 90,
      corner2: 85,
      corner3: 87,
      corner4: 84,
    };
  }

  function discoLights() {
    config = {
      ...defaultConfig,
      border1: 0,
      border2: 8,
      border3: 34,
      border4: 0,
      corner1: 38,
      corner2: 67,
      corner3: 34,
      corner4: 68,
    };
  }

  function throwingStar() {
    config = {
      ...defaultConfig,
      border1: 0,
      border2: 100,
      border3: 0,
      border4: 100,
      corner1: 0,
      corner2: 100,
      corner3: 0,
      corner4: 0,
      size: 50,
      translate: 0,
      speed: 8,
      delay: 16,
      blur: 0,
    };
  }

  function fuzzyDice() {
    config = {
      ...defaultConfig,
      border1: 20,
      border2: 35,
      border3: 15,
      border4: 5,
      corner1: 45,
      corner2: 40,
      corner3: 50,
      corner4: 40,
      rotate: 180,
      translate: 100,
    };
  }

  function bokehBalls() {
    config = {
      ...defaultConfig,
      size: 50,
    };
  }

  function ufos() {
    config = {
      ...defaultConfig,
      border1: 100,
      border2: 100,
      border3: 100,
      border4: 100,
      size: 50,
      translate: 100,
    };
  }

  function lozenges() {
    config = {
      ...defaultConfig,
      border1: 40,
      border2: 80,
      border3: 5,
      border4: 53,
      size: 150,
      translate: 100,
    };
  }

  function angryTriangle() {
    config = {
      ...defaultConfig,
      rotate: 120,
      speed: 1,
      delay: 0,
    };
  }

  // onMount(pulsingCircle);
</script>

<p>
  I recently saw an interesting multi-colored spinner in the onboarding flow of an iPhone app, so I wanted to try to
  recreate something like it in CSS.
</p>

<CssSpinner />

<p>
  This is contructed from three overlapping shapes in red, blue, and green. Each one is a square with a white background
  and rounded corners, but the radius of each corner is different. Each border also ranges in thickness, creating an
  irregular shape. Each shape has a subtle drop shadow in the same color as its border, and a filter to blur the shape
  slightly. There is also some animation that rotates the shape, changes the width of each border over time, and changes
  its scale and opacity. To make things even more organic, each shape is rotated slightly, and the animations are
  staggered.
</p>

<CssSpinner showControls={true} bind:config />

<p>
  Try turning the shapes on and off, and try modifying the different variables to get different effects. Or try
  <button class="link" on:click={discoLights}>disco lights</button>
  or
  <button class="link" on:click={bokehBalls}>bokeh balls</button>
  or
  <button class="link" on:click={whiteLotus}>white lotus</button>
  or
  <button class="link" on:click={chaosPie}>chaos pie</button>
  or
  <button class="link" on:click={bouncyFlower}>bouncy flower</button>
  or
  <button class="link" on:click={throwingStar}>throwing star</button>
  or
  <button class="link" on:click={fuzzyDice}>fuzzy dice</button>
  or
  <button class="link" on:click={vennFootballs}>venn footballs</button>
  or
  <button class="link" on:click={lozenges}>lozenges</button>
  or
  <button class="link" on:click={ufos}>UFOs</button>
  or
  <button class="link" on:click={angryTriangle}>angry triangle</button>
  or
  <button class="link" on:click={setDefaults}>the original</button>!
</p>
