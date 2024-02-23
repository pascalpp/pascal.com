import './size.less';

import * as Env          from '../util/env';
import classnames        from 'classnames';
import PropTypes         from 'prop-types';
import React             from 'react';
import useResizeObserver from 'use-resize-observer';


const isDevelopment = Env.isDevelopment();

export const defaultSizes = [
  { className: 'size-small', threshold: 480 },
  { className: 'size-medium', threshold: 640 },
  { className: 'size-large', threshold: Infinity },
];

export default function Size({ children, className, sizes = defaultSizes, debug }) {
  const { ref, width } = useResizeObserver({ box: 'border-box' });
  const sizeClassName  = getSizeClass(width, sizes);
  const classNames     = classnames('size', sizeClassName, className);
  const isReady        = !!sizeClassName;

  return (
    <div className={classNames} ref={ref}>
      {isReady && children}
      {debug && isDevelopment && <div className="size-debug">{sizeClassName} {width}</div>}
    </div>
  );
}


Size.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
  sizes:     PropTypes.arrayOf(PropTypes.shape({ classnames: PropTypes.string, threshold: PropTypes.number })),
  debug:     PropTypes.bool,
};


export function getSizeClass(width, sizes) {
  const size = sizes.find(item => width <= item.threshold);
  return size?.className || 'size-no-match';
}
