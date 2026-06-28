<script lang="ts">
  export let spokes = 8;
  export let dotspeed = 4;
  export let circlespeed = 10;
</script>

{#key spokes}
  <div class="circle" style="--circlespeed: {circlespeed + 's'}; --dotspeed: {dotspeed + 's'}">
    {#each new Array(spokes) as spoke, i}
      <div class="spoke" style="transform: rotate({(180 / spokes) * i}deg)">
        <div class="dot" style="animation-delay: {(i * 2) / spokes}s" />
      </div>
    {/each}
  </div>
{/key}

<style lang="less">
  .circle {
    width: 300px;
    height: 300px;
    border: 10px solid black;
    border-radius: 50%;
    animation: fullrotation var(--circlespeed, 10s) infinite linear;
    position: relative;
    background-color: white;
  }

  .circle .spoke {
    width: 1px;
    height: 100%;
    background-color: #000;
    position: absolute;
    left: 50%;
    top: 0;
  }

  .circle .spoke .dot {
    position: absolute;
    display: block;
    background-color: grey;
    content: '';
    left: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    animation: spokedot var(--dotspeed, 14s) infinite ease-in-out;
    box-shadow: 0 0 0 2px black;
  }

  @keyframes spokedot {
    0%,
    100% {
      top: 0px;
      background-color: blue;
    }
    16.6667% {
      background-color: green;
    }
    33.3333% {
      background-color: yellow;
    }
    50% {
      top: calc(100% - 20px);
      background-color: orange;
    }
    66.6667% {
      background-color: red;
    }
    83.3333% {
      background-color: purple;
    }
  }

  @keyframes fullrotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
