import './spinner.less';

import classnames from 'classnames';
import React      from 'react';


export default function Spinner({ size = 8, className }) {
  const style      = { width: `${size}px`, height: `${size}px` };
  const classNames = classnames('spinner', className);

  return <div className={classNames} style={style}/>;
}
