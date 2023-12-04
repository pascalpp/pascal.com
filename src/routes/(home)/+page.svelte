<script lang="ts">
  import Column from '$lib/components/Column.svelte';
  import Row from '$lib/components/Row.svelte';
  import FeaturedEmail from '$lib/components/FeaturedEmail.svelte';
  import Handstand from './images/handstand.svg?component';
  import Email, { metadata } from './emails/2017-09-14.md';
  import { randomGreeting } from './greetings';
  import type { PageData } from './$types';

  export let data: PageData;

  function selectExperiment(event: Event) {
    const target = event.target as HTMLSelectElement;
    document.location = target.value;
  }

  let greeting = data.greeting;

  function changeGreeting() {
    const newGreeting = randomGreeting();
    if (newGreeting === greeting) {
      changeGreeting();
    } else {
      greeting = newGreeting;
    }
  }
</script>

<svelte:head>
  <title>pascal.com</title>
  <style>
    body {
      background-color: #336633;
    }
  </style>
</svelte:head>

<main>
  <Row center>
    <Column right>
      <div class="thinking-handstand">
        <div class="thinking">
          <button class="unstyled thought-bubble" on:click={changeGreeting}>
            <div class="circles left" />
            <div class="thought">
              <p class="clamp-3">{greeting}</p>
            </div>
            <div class="circles right" />
          </button>
          <div class="dots" />
        </div>
        <div class="handstand">
          <Handstand />
        </div>
      </div>

      <div class="bubbles">
        <div class="bubble header monospace bold">[ the minimalist home page of a person named pascal ]</div>
        <div class="bubble-divider large" />
        <div class="bubble small bold">have a look around:</div>
        <div class="bubble-divider medium" />
        <a href="./diary" class="bubble small">read my diary</a>
        <div class="bubble-divider small" />
        <a href="./dev" class="bubble small">peruse my resume</a>
        <div class="bubble-divider small" />
        <a href="./freeruler" class="bubble small">download a free ruler for your mac</a>
        <div class="bubble-divider small" />
        <a data-sveltekit-reload href="./movies/index.html" class="bubble small">watch some movies I made</a>
        <div class="bubble-divider small" />
        <a data-sveltekit-reload href="./misc/popcorn/index.html" class="bubble small">make better popcorn</a>
        <div class="bubble-divider small" />
        <a data-sveltekit-reload href="./index.old.html" class="bubble small">look at the old version of this page</a>
        <div class="bubble-divider large" />
        <div class="bubble small bold">get outta here:</div>
        <div class="bubble-divider medium" />
        <a href="https://www.balthropalabama.com" class="bubble small">check out my small town band</a>
        <div class="bubble-divider small" />
        <a href="https://album.link/i/7202482" class="bubble small">listen to my old record</a>
        <div class="bubble-divider large" />
        <div class="bubble small bold">random bits:</div>
        <div class="bubble-divider medium" />
        <div class="bubble small">
          <select on:change={selectExperiment}>
            <option disabled selected>select an experiment ▾</option>
            <option value="./tools/lorem_ipsum.txt">lorem ipsum</option>
            <option value="./tools/navigatorproperties.html">navigator properties</option>
            <option value="./tools/keypress.html">keypress detector</option>
            <option value="./misc/photomontage/index.html">photo montages</option>
            <option value="./disco/disco.html">disco!</option>
          </select>
        </div>
        <div class="bubble-divider tall" />
        <div class="bubble small" style="margin-right:1em">
          I don’t know anything about the computer language which shares my name, so don’t ask!
        </div>
        <div class="bubble-divider medium" />
        <a href="mailto:pascal@pascal.com" class="bubble small">email me</a>
      </div>

      <FeaturedEmail attributes={metadata}>
        <Email />
      </FeaturedEmail>
    </Column>
  </Row>
</main>

<a rel="me" href="https://mastodon.social/@pascalpp" style="display: none;">Mastodon</a>
<a rel="me" href="https://moth.social/@pascal" style="display: none;">Mastodon</a>

<style lang="less">
  main {
    --bgcolor: #336633;
    --textcolor: #000;
    --bubblecolor: #ffffcc;

    font-family: 'Lucida Grande', Geneva, Helvetica, Arial, Sans-Serif;
    padding: 16px;
    padding-top: 5vh;
    padding-bottom: 15vh;
    font-size: 14px;
    color: var(--bubblecolor);

    a {
      color: var(--bubblecolor);
    }
  }

  .thinking-handstand {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-left: -3em;
    padding-right: 3em;
    @media @mobile {
      padding-right: 0em;
    }

    .thinking {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: 170px;

      .thought-bubble {
        user-select: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        font-size: 14px;
        position: relative;
        margin-right: 0.5em;
        .circles {
          width: 5em;
          height: 2em;
          background-color: var(--bubblecolor);
          border-radius: 1em;
          position: absolute;
          &::before,
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: var(--bubblecolor);
            // background-color: red;
            border-radius: 1em;
          }
          &::before {
            bottom: 100%;
            left: 15%;
          }
          &::after {
            top: 100%;
            left: 22%;
          }
          &.left {
            left: 0;
            top: 50%;
            transform: translate(-40%, -50%);
          }
          &.right {
            right: 0;
            top: 50%;
            transform: translate(40%, -50%) rotate(180deg);
          }
        }

        .thought {
          border-radius: 1em;
          max-width: 300px;
          min-height: 84px;
          background-color: var(--bubblecolor);
          color: var(--textcolor);
          padding: 0 1em;
          text-align: center;
          display: flex;
          align-items: center;
          overflow: hidden;
          z-index: 1;
          @media @mobile {
            font-size: 12px;
            max-width: 120px;
          }

          p {
            margin: 0;
          }
        }
      }

      .dots {
        margin-top: 6px;
        width: 1.75em;
        margin-right: 0.5em;
        aspect-ratio: 1 / 1;
        background-color: var(--bubblecolor);
        border-radius: 50%;
        position: relative;

        &::before,
        &::after {
          content: '';
          position: absolute;
          aspect-ratio: 1 / 1;
          background-color: var(--bubblecolor);
          border-radius: 50%;
        }

        &::before {
          top: 110%;
          right: -35%;
          width: 70%;
        }
        &::after {
          top: 185%;
          right: -70%;
          width: 40%;
        }
      }
    }

    .handstand {
      width: 180px;
      flex-shrink: 0;
    }
  }

  .bold {
    font-weight: bold;
  }

  .monospace {
    font-family: 'Lucida Console', Monaco, monospace;
  }

  .bubbles {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: var(--textcolor);

    a {
      color: var(--textcolor);
      text-decoration: none;
      &:hover,
      &:active {
        text-decoration: underline;
      }
    }
  }

  .bubble {
    display: block;
    background-color: var(--bubblecolor);
    padding: 0.75em 1.5em;
    border-radius: 2em;
    text-align: right;
    margin-right: 5em;
    z-index: 1;

    @media @mobile {
      margin-right: 1.25em;
      padding: 1em 1.5em;
    }
    &.header {
      padding: 1em 2em;
      border-radius: 2em;
      margin-right: 0em;
      font-size: 1.2em;
      @media @mobile {
        font-size: 1.1em;
      }
    }

    select {
      color: var(--textcolor);
      appearance: none;
      background-color: transparent;
      border: none;
      position: relative;
      width: min-content;
      text-align: right;
    }
  }

  .bubble-divider {
    background-color: var(--bubblecolor);
    position: relative;
    transform: translateX(50%);
    margin-inline-end: 8em;
    z-index: 0;
    @media @mobile {
      margin-block: -0.25px;
      margin-inline-end: 5em;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      height: 100%;
      aspect-ratio: 1 / 1;
      background-color: var(--bgcolor);
      // background-color: red;
      border-radius: 50%;
    }
    &::before {
      left: 0;
      transform: translateX(-50%);
    }
    &::after {
      right: 0;
      transform: translateX(50%);
    }

    &.small {
      width: 1em;
      height: 0;
      height: 0.25em;
    }
    &.medium {
      width: 1.5em;
      height: 0.75em;
    }
    &.large {
      width: 3em;
      height: 1.5em;
    }
    &.tall {
      width: 2em;
      height: 3em;
      &::before,
      &::after {
        width: 75%;
        border-radius: 1em;
      }
    }
  }
</style>
