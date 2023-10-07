<script lang="ts">
  let maxApp = 6;
  let currentApp = 2;
  let switching = false;

  function slideLeft() {
    currentApp = Math.max(0, currentApp - 1);
  }
  function slideRight() {
    currentApp = Math.min(maxApp, currentApp + 1);
  }

  function startSwitching() {
    switching = true;
  }
  function stopSwitching() {
    switching = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main>
  <div class="stage">
    <button class="slide-button" class:switching type="button" on:click={slideLeft}>Swipe Left</button>
    <div class="window">
      <div class="apps-small">
        <div class="apps-small-row" style="transform: translateX(-{191 * currentApp}px)">
          <div class="app-small" class:current={currentApp === 0} role="button" tabindex={0} on:click={stopSwitching}>
            <div class="caption"><span>Home</span></div>
            <img src="./apps-small/home.png" alt="" draggable="false" />
          </div>
          <div class="app-small" class:current={currentApp === 1} role="button" tabindex={0} on:click={stopSwitching}>
            <div class="caption"><span>Mail</span></div>
            <img src="./apps-small/mail.png" alt="" draggable="false" />
            <div class="close" />
          </div>
          <div class="app-small" class:current={currentApp === 2} role="button" tabindex={0} on:click={stopSwitching}>
            <div class="caption"><span>Facebook</span></div>
            <img src="./apps-small/facebook.png" alt="" draggable="false" />
            <div class="close" />
          </div>
          <div class="app-small" class:current={currentApp === 3} role="button" tabindex={0} on:click={stopSwitching}>
            <div class="caption"><span>Safari</span></div>
            <img src="./apps-small/nytimes.png" alt="" draggable="false" />
            <div class="close" />
          </div>
          <div class="app-small" class:current={currentApp === 4} role="button" tabindex={0} on:click={stopSwitching}>
            <div class="caption"><span>Messages</span></div>
            <img src="./apps-small/sms.png" alt="" draggable="false" />
            <div class="close" />
          </div>
          <div class="app-small" class:current={currentApp === 5} role="button" tabindex={0} on:click={stopSwitching}>
            <div class="caption"><span>TouchTerm</span></div>
            <img src="./apps-small/terminal.png" alt="" draggable="false" />
            <div class="close" />
          </div>
          <div class="app-small" class:current={currentApp === 6} role="button" tabindex={0} on:click={stopSwitching}>
            <div class="caption"><span>Twitterific</span></div>
            <img src="./apps-small/twitterific.png" alt="" draggable="false" />
            <div class="close" />
          </div>
        </div>
        <div class="app-swipe left" role="button" tabindex={0} on:click={slideLeft} class:active={currentApp > 0} />
        <div
          class="app-swipe right"
          role="button"
          tabindex={0}
          on:click={slideRight}
          class:active={currentApp < maxApp}
        />
        <div class="pager">
          <span class:current={currentApp === 0} />
          <span class:current={currentApp === 1} />
          <span class:current={currentApp === 2} />
          <span class:current={currentApp === 3} />
          <span class:current={currentApp === 4} />
          <span class:current={currentApp === 5} />
          <span class:current={currentApp === 6} />
        </div>
      </div>
      <div class="apps-large" class:switching>
        <div class="app-large" class:current={currentApp === 0}>
          <img src="./apps-large/home.png" alt="" draggable="false" />
        </div>
        <div class="app-large" class:current={currentApp === 1}>
          <img src="./apps-large/mail.png" alt="" draggable="false" />
        </div>
        <div class="app-large" class:current={currentApp === 2}>
          <img src="./apps-large/facebook.png" alt="" draggable="false" />
        </div>
        <div class="app-large" class:current={currentApp === 3}>
          <img src="./apps-large/nytimes.png" alt="" draggable="false" />
        </div>
        <div class="app-large" class:current={currentApp === 4}>
          <img src="./apps-large/sms.png" alt="" draggable="false" />
        </div>
        <div class="app-large" class:current={currentApp === 5}>
          <img src="./apps-large/terminal.png" alt="" draggable="false" />
        </div>
        <div class="app-large" class:current={currentApp === 6}>
          <img src="./apps-large/twitterific.png" alt="" draggable="false" />
        </div>
      </div>
      <div class="iphone" />
    </div>
    <button class="slide-button" class:switching type="button" on:click={slideRight}>Swipe Right</button>
  </div>
  <p class="exit-note" class:switching>(Click app to enlarge and leave switcher)</p>
  <p>
    <button class="start-button" class:switching type="button" on:click={startSwitching}>Click to switch apps</button>
  </p>
</main>

<style lang="less">
  main {
    padding: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }

  .stage {
    display: flex;
    flex-direction: row;
    user-select: none;
    gap: 20px;
  }

  .window {
    width: 299px;
    height: 590px;
    position: relative;
    overflow: hidden;
  }

  .apps-small {
    position: absolute;
    overflow: hidden;
    top: 95px;
    left: 35px;
    width: 230px;
    height: 345px;

    .apps-small-row {
      position: absolute;
      background-color: #afa19e;
      display: flex;
      flex-direction: row;
      width: 1800px;
      height: 345px;
      padding: 20px 27px;
      gap: 16px;
      transition: transform 0.3s ease-in-out;

      .app-small {
        text-align: center;
        position: relative;
        .caption {
          display: block;
          font-size: 13px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 14px;
          span {
            background-color: rgba(0, 0, 0, 0.5);
            padding: 3px 12px;
            border-radius: 10px;
          }
        }
        img {
          width: 175px;
          height: 252px;
          box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
        }
        .close {
          position: absolute;
          left: -10px;
          top: 20px;
          width: 20px;
          height: 20px;
          background-image: url(close.png);
          background-repeat: no-repeat;
          display: none;
          cursor: pointer;
        }
        &.current .close {
          display: block;
        }
      }
    }

    .app-swipe {
      position: absolute;
      width: 15px;
      height: 252px;
      top: 50px;
      cursor: pointer;
      // background-color: rgb(255 0 0 / 0.5);
      display: none;

      &.left {
        left: 0px;
      }
      &.right {
        right: 0px;
      }
      &.active {
        display: block;
      }
    }

    .pager {
      position: absolute;
      width: 230px;
      height: 20px;
      left: 0px;
      top: 312px;
      text-align: center;

      span {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 0 1.25px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        &.current {
          background-color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }

  .apps-large {
    position: absolute;
    width: 230px;
    height: 345px;
    left: 35px;
    top: 95px;
    transition: scale 0.3s ease-in-out 0.1s, opacity 0.1s ease-in-out;

    .app-large {
      position: absolute;
      inset: 0;
      display: none;
      &.current {
        display: block;
      }
    }

    &.switching {
      transition: scale 0.3s ease-in-out, opacity 0.3s ease-in-out 0.2s;
      pointer-events: none;
      transform-origin: center;
      scale: 0.76;
      opacity: 0;
    }
  }

  .iphone {
    background-image: url(iphone.png);
    background-repeat: no-repeat;
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .slide-button {
    opacity: 0;
    pointer-events: none;
    &.switching {
      opacity: 1;
      pointer-events: all;
    }
  }

  .start-button {
    opacity: 1;
    pointer-events: all;
    &.switching {
      display: none;
    }
  }

  .exit-note {
    display: none;
    &.switching {
      display: block;
    }
  }
</style>
