<script lang="ts">
  export let animate = false;
  export let dotted = false;
  export let offset = 0;
  export let dots = '2 25';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 280 140"
  xml:space="preserve"
  class:animate
  class:dotted
  style="--dots: {dots}; --offset: {offset};"
>
  <path
    d="m207.153 64.995.001-45.499m-.001 45.499-22.749-39.404m22.749 39.404-39.404-22.75m39.404 22.75-45.5-.001m45.5.001-39.405 22.75m39.405-22.75-22.751 39.404m22.751-39.404-.001 45.5m.001-45.5 22.749 39.405m-22.749-39.405 39.403 22.751m-39.403-22.751 45.5.001m-45.5-.001 39.404-22.749m-39.404 22.749 22.75-39.403"
  />
  <path
    d="m67.654 76.495.001-38.674m-.001 38.674L48.317 43.002m19.337 33.493L34.161 57.157m33.493 19.338H28.979m38.675 0L34.16 95.832m33.494-19.337-19.339 33.494m19.339-33.494-.001 38.675m.001-38.675 19.336 33.494M67.654 76.495l33.493 19.339M67.654 76.495l38.675.001m-38.675-.001 33.494-19.336M67.654 76.495l19.338-33.493"
  />
  <path
    d="M76.654 47.495V10.368m0 37.127L58.09 15.341m18.564 32.154L44.5 28.931m32.154 18.564H39.526m37.128 0L44.5 66.059m32.154-18.564L58.089 79.649m18.565-32.154-.001 37.128m.001-37.128L95.217 79.65M76.654 47.495l32.153 18.565M76.654 47.495l37.128.001m-37.128-.001 32.154-18.563M76.654 47.495l18.564-32.153"
  />
  <path
    d="M203.154 97.996V68.293m0 29.703-14.851-25.724m14.851 25.724-25.723-14.852m25.723 14.852-29.703-.001m29.703.001-25.724 14.85m25.724-14.85-14.852 25.722m14.852-25.722-.001 29.702m.001-29.702 14.85 25.723m-14.85-25.723 25.722 14.851m-25.722-14.851h29.702m-29.702 0 25.723-14.851m-25.723 14.851 14.851-25.723"
  />
</svg>

<style lang="less">
  svg {
    --blue: #1976d2;
    --red: #d32f2f;
    path {
      stroke: var(--blue);
      stroke-width: 3;
      stroke-linecap: round;
    }
    path:nth-child(2) {
      stroke-width: 1;
    }
    path:nth-child(3) {
      transform: translateX(20px);
      stroke: var(--red);
    }
    path:nth-child(4) {
      stroke: var(--red);
      stroke-width: 1;
      transform: translateX(-24px);
    }
  }

  .dotted {
    path {
      stroke-dasharray: var(--dots);
      stroke-dashoffset: var(--offset);
    }
  }

  .animate {
    --blue: #1976d2;
    path {
      stroke: var(--blue);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-dasharray: var(--dots);
      stroke-dashoffset: 0;
      animation: draw 3s forwards infinite;
      opacity: 0;
      transform-origin: center;
      --start: 0s;
      --delay: 0s;
      animation-delay: calc(var(--start) + var(--delay));
    }

    path:nth-child(1) {
      --delay: 0s;
    }
    path:nth-child(2) {
      --delay: 0.3s;
    }
    path:nth-child(3) {
      --delay: 0.6s;
    }
    path:nth-child(4) {
      --delay: 0.9s;
    }
  }

  @keyframes fadeUpAndOut {
    from {
      opacity: 1;
      transform: translateY(0px);
    }
    to {
      opacity: 0;
      transform: translateY(var(--distance));
    }
  }

  @keyframes draw {
    0% {
      opacity: 0;
      stroke-dashoffset: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      stroke-dashoffset: var(--offset);
      opacity: 0;
    }
  }
</style>
