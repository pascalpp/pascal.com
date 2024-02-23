import './column.less';

import classnames from 'classnames';
import React      from 'react';


export default function Column({
  label,
  className,
  children,
  left,
  center,
  right,
  fill,
  gap,
}) {
  const classNames = classnames('layout-column', className, { left, center, right, fill });

  const style = gap ? { gap } : null;

  return (
    <div className={classNames} style={style} aria-label={label}>
      {children}
    </div>
  );
}
