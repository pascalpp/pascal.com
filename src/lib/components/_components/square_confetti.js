import './square_confetti.less';

import { isPuppeteer } from '../util/env';
import React           from 'react';
import ReactDOM        from 'react-dom';
import useBoolean      from '../hooks/use_boolean';


const animate = !isPuppeteer();

export default function SquareConfetti() {
  const [ confettiVisible, , stop ] = useBoolean(animate);

  if (confettiVisible)
    return ReactDOM.createPortal(<SquareConfettiCanvas {...{ stop }}/>, document.body);
  else
    return null;
}


class Confetto {
  constructor(canvas, ctx) {
    const colors = [ [ 63, 165, 203, 1 ], [ 111, 220, 157, 1 ], [ 195, 90, 90, 1 ], [ 242, 201, 76, 1 ] ];
    this.xpos    = 0.5;
    this.canvas  = canvas;
    this.ctx     = ctx;

    this.style = colors[~~range(0, 4)];
    this.rgb   = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
    this.replace();
  }

  replace() {
    this.opacity = 0;
    this.dop     = 0.03 * range(1, 4);
    this.x       = range(0, this.canvas.width);
    this.y       = range(-20, this.canvas.height);
    this.xmax    = this.canvas.width;
    this.ymax    = this.canvas.height;
    this.vx      = (range(0, 2) + (8 * this.xpos)) - 5;
    this.vy      = (0.7) + range(-1, 1);
  }

  drawSquare() {
    this.ctx.beginPath();
    this.ctx.fillStyle = `${this.rgb},${this.opacity})`;
    this.ctx.fillRect(this.x, this.y, 15, 15);
  }

  draw() {
    this.x       = this.x + this.vx;
    this.y       = this.y + this.vy;
    this.opacity =  this.opacity + this.dop;
    if (this.opacity > 1) {
      this.opacity = 1;
      this.dop     = this.dop * -1;
    }

    if ((this.opacity < 0) || (this.y > this.ymax))
      this.replace();

    if (!(this.x > 0 && this.x < this.xmax))
      this.x = (this.x + this.xmax) % this.xmax;

    return this.drawSquare();
  }
}

class Confetti {
  constructor(canvas) {
    this.stopped          = true;
    this.confetti         = [];
    this.numberOfConfetti = 200;
    this.canvas           = canvas;
    this.canvas.width     = window.innerWidth;
    this.canvas.height    = window.innerHeight;
    this.ctx              = this.canvas.getContext('2d');
  }

  start(stop) {
    this.stopped  = false;
    this.confetti = [];

    for (let i = 0; i < this.numberOfConfetti; i++)
      this.confetti.push(new Confetto(this.canvas, this.ctx));

    this.canvas.addEventListener('animationend', () => {
      stop();
      this.stopped = true;
    });

    this.render();
    this.canvas.classList.add('start');
  }

  render() {
    if (this.stopped)
      return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Array.from(this.confetti).map(c => c.draw());
    window.requestAnimationFrame(() => this.render());
  }
}


function SquareConfettiCanvas({ stop }) {
  const ref = React.useRef();

  React.useEffect(function initializeConfetti() {
    const confetti   = new Confetti(ref.current);
    const startTimer = setTimeout(() => confetti.start(stop), 100);
    return () => {
      clearTimeout(startTimer);
    };
  });

  return (
    <canvas ref={ref} className="square-confetti"/>
  );
}

function range(a, b) {
  return ((b - a) * Math.random()) + a;
}
