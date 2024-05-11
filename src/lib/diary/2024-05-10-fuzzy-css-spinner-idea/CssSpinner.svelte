<script lang="ts">
</script>

<div class="fuzzy-spinner">
  <div class="spinner red" />
  <div class="spinner blue" />
  <div class="spinner green" />
</div>

<style lang="less">
  .fuzzy-spinner {
    width: 300px;
    height: 300px;
    position: relative;
  }

  .spinner {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    animation: spin 9s linear infinite;
    transition: border-width 0.5s;
    --border1: 20px;
    --border2: 35px;
    --border3: 15px;
    --border4: 5px;
    --min-scale: 0.8;
    --max-scale: 1;

    &.red {
      color: red;
      --min-opacity: 0.8;
      --max-opacity: 1;
      animation-delay: -6s;
    }
    &.blue {
      color: blue;
      --min-opacity: 0.5;
      --max-opacity: 0.9;
      &::before {
        transform: rotate(120deg);
        animation-delay: -3s;
      }
    }
    &.green {
      color: green;
      --min-opacity: 0.3;
      --max-opacity: 0.8;
      &::before {
        transform: rotate(240deg);
        animation-delay: 0;
      }
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      inset: 25%;
      width: 50%;
      height: 50%;
      border: 10px solid currentColor;
      position: relative;
      border-width: 10px 15px 10px 5px;
      border-radius: 45% 40% 50% 40%;
      animation: wobble 2s ease-in-out infinite;
      background-color: white;
      filter: drop-shadow(0 0 20px color-mix(in srgb, currentColor 50%, transparent));
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      inset: 0px;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(3px);
      border-radius: 50%;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  @keyframes wobble {
    0% {
      border-width: var(--border1) var(--border2) var(--border3) var(--border4);
      opacity: var(--max-opacity);
      scale: var(--min-scale);
    }
    25% {
      border-width: var(--border4) var(--border1) var(--border2) var(--border3);
    }
    50% {
      border-width: var(--border3) var(--border4) var(--border1) var(--border2);
      opacity: var(--min-opacity);
      scale: var(--max-scale);
    }
    75% {
      border-width: var(--border2) var(--border3) var(--border4) var(--border1);
    }
    100% {
      border-width: var(--border1) var(--border2) var(--border3) var(--border4);
      opacity: var(--max-opacity);
      scale: var(--min-scale);
    }
  }
</style>
