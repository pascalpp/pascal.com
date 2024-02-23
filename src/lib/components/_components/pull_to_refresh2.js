/* eslint-disable no-console */
import './pull_to_refresh2.less';

import classnames  from 'classnames';
import ProgressBar from './progress_bar';
import React       from 'react';
// import SpokeSpinner from '../components/spoke_spinner';


export default function PullToRefresh({ className, onRefresh, distance = 60 }) {
  const ref                           = React.useRef();
  const [ start, setStart ]           = React.useState(0);
  const [ current, setCurrent ]       = React.useState(0);
  const [ released, setReleased ]     = React.useState(false);
  const [ refreshing, setRefreshing ] = React.useState(false);
  const [ complete, setComplete ]     = React.useState(false);
  const [ change, setChange ]         = React.useState(0);
  const [ percent, setPercent ]       = React.useState(0);
  const [ height, setHeight ]         = React.useState(0);

  const animate    = !!refreshing;
  const classNames = classnames('pull-to-refresh', className, { released });
  const style      = { height: `${height}px` };

  React.useEffect(function handleMouse() {
    // return early if we're already spinning
    if (refreshing)
      return () => {};

    const element = ref.current;
    const parent  = element.parentElement;

    // const disallowedNodes = [ 'a', 'button', 'input', 'select', 'textarea' ];

    function onMouseDown(event) {
      // const { currentTarget, target, srcElement } = event;
      // console.log(target);

      // not working yet
      // const node = target.nodeName.toLowerCase();
      // console.log({ currentTarget, target, srcElement, node });
      // if (disallowedNodes.includes(node))
      //   return;

      // not sure if we need to prevent this behaveior when clicking on a
      // scrollable sub-element, but this is working if we need it
      // if (isScrolled(parent, currentTarget, target, srcElement))
      //   return;

      // only allow left mouse button
      if (event.which !== 1)
        return;

      // trying to prevent dragging on a button from triggering the button when
      // you release the PTR. not working yet
      event.preventDefault();
      event.stopPropagation();

      setStart(event.screenY);
      setCurrent(event.screenY);
      parent.addEventListener('mousemove', onMouseMove);
      parent.addEventListener('mouseup', onMouseUp);
      parent.addEventListener('mouseleave', onMouseLeave);
    }

    function onMouseMove(event) {
      setCurrent(event.screenY);
    }

    function onMouseUp() {
      setReleased(true);
      removeOtherListeners();
    }

    function onMouseLeave() {
      setStart(0);
      setCurrent(0);
      removeOtherListeners();
    }

    function removeOtherListeners() {
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseup', onMouseUp);
      parent.removeEventListener('mouseleave', onMouseUp);
    }

    parent.addEventListener('mousedown', onMouseDown);
    return () => {
      parent.removeEventListener('mousedown', onMouseDown);
      removeOtherListeners();
    };
  }, [ refreshing ]);

  React.useEffect(function handleTouch() {
    // return early if we're already spinning
    if (refreshing)
      return () => {};

    const element = ref.current;
    const parent  = element.parentElement;

    function onTouchStart(event) {
      setReleased(false);
      setStart(getTouchCoordinate(event));
      setCurrent(getTouchCoordinate(event));
    }

    function onTouchMove(event) {
      setCurrent(getTouchCoordinate(event));
    }

    async function onTouchEnd() {
      setReleased(true);
    }

    parent.addEventListener('touchstart', onTouchStart);
    parent.addEventListener('touchmove', onTouchMove);
    parent.addEventListener('touchend', onTouchEnd);
    return () => {
      parent.removeEventListener('touchstart', onTouchStart);
      parent.removeEventListener('touchmove', onTouchMove);
      parent.removeEventListener('touchend', onTouchEnd);
    };
  }, [ refreshing ]);

  React.useEffect(function onPull() {
    if (!released)
      setChange(Math.max(0, current - start));

    return () => {};
  }, [ released, start, current ]);

  React.useEffect(function onChange() {
    if (!released) {
      setHeight(getChangeHeight(change, distance));
      setPercent(getPercent(change, distance));
    }

    return () => {};
  }, [ change, distance, released ]);

  React.useEffect(function onReleased() {
    async function refresh() {
      try {
        if (percent >= 100) {
          setRefreshing(true);
          setHeight(distance / 2);
          await onRefresh();
        }
      } finally {
        setPercent(0);
        setHeight(0);
        setComplete(true);
      }
    }

    if (released)
      refresh();
  }, [ released, percent, onRefresh, distance ]);

  React.useEffect(function onComplete() {
    if (!complete)
      return () => {};

    addTimeout(reset, 500);

    function reset() {
      setStart(0);
      setCurrent(0);
      setHeight(0);
      setPercent(0);
      setReleased(false);
      setRefreshing(false);
      setComplete(false);
      clearTimeouts();
    }

    return clearTimeouts;
  }, [ complete ]);

  return (
    <>
      <div className={classNames} ref={ref} style={style}>
        <ProgressBar percent={percent} animate={animate} className="pull-to-refresh-progress"/>
      </div>
      <Debug {...{ start, current, change, height, percent, complete, refreshing }}/>
    </>
  );
}


function Debug({ start, current, change, height, percent, complete, refreshing }) {
  return (
    <>
      <p>start: {start}</p>
      <p>current: {current}</p>
      <p>change: {change}</p>
      <p>height: {height}</p>
      <p>percent: {percent}</p>
      <p>complete: {complete.toString()}</p>
      <p>refreshing: {refreshing.toString()}</p>
    </>
  );
}

function getChangeHeight(change, distance) {
  if (change <= distance)
    return change;
  else
    return distance + (change - distance) / 4;
}


function getPercent(change, distance) {
  const percent = Math.round((change - 20) / distance * 100);
  return Math.max(Math.min(percent, 100), 0);
}


function getTouchCoordinate(event) {
  const touch = event.targetTouches?.[0] ?? event;
  return touch?.screenY;
}

// notes:
// https://developer.mozilla.org/en-US/docs/Web/API/Event/target
// https://dev.to/vijitail/pull-to-refresh-animation-with-vanilla-javascript-17oc
// https://codepen.io/Vijit_Ail/pen/pmbypw
// https://developer.chrome.com/blog/overscroll-behavior/

// distance before opacity should be increased. this keeps the spinner from
// showing until there's enough room for it.
const offset = 40;

export function getOpacity(changeY, distance) {
  const change  = Math.max(changeY - offset, 0);
  const divisor = distance - offset;
  const opacity = Math.min(change / divisor, 1);
  return Math.round(opacity * 1000) / 1000;
}


// eslint-disable-next-line no-unused-vars
function isScrolled(...elements) {
  return elements.some(isElementScrolled);
}

function isElementScrolled(element) {
  return (element?.scrollTop > 0) || (element?.parentElement && isElementScrolled(element?.parentElement));
}

const timers = [];
function addTimeout(fn, delay) {
  const timer = setTimeout(fn, delay);
  timers.push(timer);
  return timer;
}

function clearTimeouts() {
  timers.forEach(clearTimeout);
}
