<script lang="ts">
  import CssSpinner, { defaultConfig, type SpinnerConfig } from './CssSpinner.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  function getConfigFromParams(params: URLSearchParams): SpinnerConfig | null {
    let paramsConfig: Record<string, boolean | number> = {};
    for (const key of Object.keys(defaultConfig)) {
      const value = params.get(key);
      if (value === 'true' || value === 'false') {
        paramsConfig[key] = value === 'true';
      } else if (value !== null) {
        paramsConfig[key] = Number(value);
      }
    }
    return paramsConfig as SpinnerConfig;
  }

  function setConfig(querystring: string) {
    const params = new URLSearchParams(querystring);
    config = {
      ...defaultConfig,
      ...getConfigFromParams(params),
    };
  }

  // https://pascal.localhost/diary/2024-05-10-fuzzy-css-spinner-idea?red=true&blue=true&green=true&border1=12&border2=100&border3=100&border4=100&corner1=100&corner2=100&corner3=100&corner4=100&size=0&rotate=120&translate=400&blur=2&speed=8&delay=16

  let config: SpinnerConfig = { ...defaultConfig };

  function setDefaults() {
    config = {
      ...defaultConfig,
    };
  }

  function wanderingAtom() {
    setConfig(
      'red=82&blue=78&green=85&border1=0&border2=100&border3=100&border4=100&corner1=100&corner2=100&corner3=100&corner4=100&size=0&rotate=45&translate=400&blur=2&speed=10&delay=20&yellow=38',
    );
  }

  function whiteLotus() {
    setConfig(
      'red=90&blue=80&green=70&yellow=0&border1=0&border2=0&border3=0&border4=0&corner1=15&corner2=85&corner3=20&corner4=75&size=300&rotate=60&translate=0&blur=3&speed=15&delay=5',
    );
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
      yellow: 0,
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
      size: 250,
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

  function spirograph() {
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
    setConfig(
      'red=90&blue=80&green=70&yellow=0&border1=0&border2=100&border3=0&border4=100&corner1=0&corner2=100&corner3=0&corner4=0&size=50&rotate=60&translate=0&blur=0&speed=8&delay=16',
    );
  }

  function fuzzyDice() {
    config = {
      ...defaultConfig,
      yellow: 0,
      border1: 20,
      border2: 35,
      border3: 15,
      border4: 5,
      corner1: 45,
      corner2: 40,
      corner3: 50,
      corner4: 40,
      rotate: 0,
      translate: 150,
      speed: 15,
      delay: 5,
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
      yellow: 90,
      border1: 100,
      border2: 100,
      border3: 100,
      border4: 100,
      size: 0,
      translate: 90,
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

  function jellyBeans() {
    config = {
      ...defaultConfig,
      yellow: 90,
      border1: 40,
      border2: 80,
      border3: 5,
      border4: 53,
      size: 150,
      rotate: 120,
      translate: 100,
      speed: 6,
      delay: 19,
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

  function turtleCarousel() {
    config = {
      ...defaultConfig,
      blue: 90,
      green: 90,
      yellow: 0,
      border1: 100,
      border2: 100,
      border3: 100,
      border4: 100,
      corner1: 100,
      corner2: 0,
      corner3: 50,
      corner4: 0,
      size: 120,
      rotate: 0,
      translate: 0,
      speed: 9,
      delay: 3,
    };
  }

  function appIcon() {
    setConfig(
      'red=90&blue=90&green=90&yellow=100&border1=80&border2=80&border3=80&border4=80&corner1=100&corner2=0&corner3=50&corner4=0&size=0&rotate=0&translate=0&blur=3&speed=12&delay=3',
    );
  }

  function chillTriangle() {
    config = {
      ...defaultConfig,
      size: 300,
      rotate: 120,
      translate: 10,
      speed: 20,
      delay: 0,
    };
  }

  onMount(() => {
    const paramsConfig = getConfigFromParams($page.url.searchParams);
    if (paramsConfig) {
      config = {
        ...defaultConfig,
        ...paramsConfig,
      };
    }
  });

  // $: if (browser) updateParams(config);

  let timer = 0;
  function updateParams(c: SpinnerConfig) {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      Object.entries(c).forEach(([key, value]) => {
        $page.url.searchParams.set(key, String(value));
      });
      history.replaceState(null, '', $page.url);
    }, 1000);
  }
</script>

<p>
  I recently saw an interesting multi-colored spinner in the onboarding flow of an iPhone app, so I wanted to try to
  recreate something like it in CSS.
</p>

<CssSpinner showControls={true} bind:config />

<details open>
  <summary>How it’s made</summary>
  <p>
    This is contructed from four overlapping shapes in red, blue, green, and yellow. Each one is a square with a white
    background and rounded corners, with a different radius for each corner. Each border also ranges in thickness,
    creating an irregular shape. Each shape has a subtle drop shadow in the same color as its border, and a filter to
    blur the shape slightly. There is also some animation that rotates the shape, changes the width of each border over
    time, and changes its scale and opacity. To make things even more organic, each shape is rotated slightly, and the
    animations are staggered.
  </p>
</details>

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
  <button class="link" on:click={turtleCarousel}>turtle carousel</button>
  or
  <button class="link" on:click={appIcon}>app icon</button>
  or
  <button class="link" on:click={fuzzyDice}>fuzzy dice</button>
  or
  <button class="link" on:click={vennFootballs}>venn footballs</button>
  or
  <button class="link" on:click={spirograph}>spirograph</button>
  or
  <button class="link" on:click={ufos}>UFOs</button>
  or
  <button class="link" on:click={jellyBeans}>jelly beans</button>
  or
  <button class="link" on:click={angryTriangle}>angry triangle</button>
  or
  <button class="link" on:click={chillTriangle}>chill triangle</button>
  or
  <button class="link" on:click={wanderingAtom}>wandering atom</button>
  or
  <button class="link" on:click={setDefaults}>the original</button>!
</p>
