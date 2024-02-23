import './row.less';

import classnames from 'classnames';
import React      from 'react';


export default function Row({
  className,
  label,
  title,
  children,
  center,
  right,
  spread,
  top,
  bottom,
  gap,
  wrap,
  fill,
}) {
  const classNames = classnames('layout-row', className, { center, right, spread, top, bottom, wrap, fill });

  const style = gap ? { gap } : null;

  return (
    <div className={classNames} aria-label={label} title={title} style={style}>
      {children}
    </div>
  );
}
