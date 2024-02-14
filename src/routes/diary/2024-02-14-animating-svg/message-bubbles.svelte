<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 200" xml:space="preserve">
  <g class="messages">
    <path
      class="message gray"
      d="M64 18.164C64 12.551 68.551 8 74.164 8h134.671c5.613 0 10.164 4.551 10.164 10.164v33.033c0 5.613-4.551 10.164-10.164 10.164H64V18.164z"
    />
    <path
      class="message blue"
      d="M106.588 77.021c0-6.368 5.162-11.53 11.53-11.53h89.354c6.367 0 11.529 5.162 11.529 11.53v14.412H118.117c-6.368 0-11.529-5.162-11.529-11.53v-2.882z"
    />
    <path
      class="message gray"
      d="M60 107.021c0-6.368 5.162-11.53 11.53-11.53h109.53c6.368 0 11.53 5.162 11.53 11.53v2.883c0 6.367-5.162 11.529-11.53 11.529H60v-14.412z"
    />
    <path
      class="message blue"
      d="M133 137.021c0-6.367 5.162-11.529 11.53-11.529h74.941v14.412c0 6.367-5.162 11.529-11.529 11.529H144.53c-6.368 0-11.53-5.162-11.53-11.529v-2.883z"
    />
  </g>
  <g class="fireworks">
    <g>
      <path
        d="m207.153 64.995.001-45.499m-.001 45.499-22.749-39.404m22.749 39.404-39.404-22.75m39.404 22.75-45.5-.001m45.5.001-39.405 22.75m39.405-22.75-22.751 39.404m22.751-39.404-.001 45.5m.001-45.5 22.749 39.405m-22.749-39.405 39.403 22.751m-39.403-22.751 45.5.001m-45.5-.001 39.404-22.749m-39.404 22.749 22.75-39.403"
      />
    </g>
    <g>
      <path
        d="m67.654 76.495.001-38.674m-.001 38.674L48.317 43.002m19.337 33.493L34.161 57.157m33.493 19.338H28.979m38.675 0L34.16 95.832m33.494-19.337-19.339 33.494m19.339-33.494-.001 38.675m.001-38.675 19.336 33.494M67.654 76.495l33.493 19.339M67.654 76.495l38.675.001m-38.675-.001 33.494-19.336M67.654 76.495l19.338-33.493"
      />
    </g>
    <g>
      <path
        d="M76.654 47.495V10.368m0 37.127L58.09 15.341m18.564 32.154L44.5 28.931m32.154 18.564H39.526m37.128 0L44.5 66.059m32.154-18.564L58.089 79.649m18.565-32.154-.001 37.128m.001-37.128L95.217 79.65M76.654 47.495l32.153 18.565M76.654 47.495l37.128.001m-37.128-.001 32.154-18.563M76.654 47.495l18.564-32.153"
      />
    </g>
    <g>
      <path
        d="M203.154 97.996V68.293m0 29.703-14.851-25.724m14.851 25.724-25.723-14.852m25.723 14.852-29.703-.001m29.703.001-25.724 14.85m25.724-14.85-14.852 25.722m14.852-25.722-.001 29.702m.001-29.702 14.85 25.723m-14.85-25.723 25.722 14.851m-25.722-14.851h29.702m-29.702 0 25.723-14.851m-25.723 14.851 14.851-25.723"
      />
    </g>
  </g>
</svg>

<style lang="less">
  svg {
    border: 1px solid;
    --blue: #1976d2;
    --gray: #e0e0e0;

    .messages {
      transform: translateY(40px);
      .message.blue {
        fill: var(--blue);
      }
      .message.gray {
        fill: var(--gray);
      }

      .message {
        animation: fadeUpAndOut 1s forwards;
      }

      .message:nth-child(1) {
        animation-delay: 1s;
        animation-duration: 1s;
        --distance: -40px;
      }
      .message:nth-child(2) {
        animation-delay: 1.1s;
        animation-duration: 1.2s;
        --distance: -55px;
      }
      .message:nth-child(3) {
        animation-delay: 1.2s;
        animation-duration: 1.3s;
        --distance: -65px;
      }
      .message:nth-child(4) {
        animation-delay: 1.3s;
        animation-duration: 1.4s;
        --distance: -85px;
      }
    }

    .fireworks {
      g {
        stroke: var(--blue);
        stroke-width: 3;
        stroke-linecap: round;
        stroke-dasharray: 1 50;
        stroke-dashoffset: 0;
        animation: draw 3s forwards;
        opacity: 0;
        transform-origin: center;
        --start: 1.5s;
        --delay: 0s;
        animation-delay: calc(var(--start) + var(--delay));
      }

      g:nth-child(1) {
        --delay: 0s;
      }
      g:nth-child(2) {
        --delay: 0.3s;
        stroke-width: 1;
      }
      g:nth-child(3) {
        --delay: 0.6s;
        transform: translateX(20px);
      }
      g:nth-child(4) {
        --delay: 0.9s;
        stroke-width: 1;
        transform: translateX(-20px);
      }
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
      opacity: 1;
    }
    10% {
      opacity: 1;
    }
    50% {
      stroke-dasharray: 1 25;
    }
    100% {
      stroke-dashoffset: -80;
      stroke-dasharray: 1 25;
      opacity: 0;
    }
  }
</style>
