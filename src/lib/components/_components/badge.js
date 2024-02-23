import './badge.less';

import classnames from 'classnames';
import React      from 'react';


export default function Badge({
  children,
  className,
  type,
  tooltip,
  small,
  standalone = false,
}) {
  const classNames = classnames('badge', className, type, { standalone, small });

  return (
    <span className={classNames} data-tooltip={tooltip}>{children}</span>
  );
}
