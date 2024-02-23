import './progress_bar.less';

import classnames from 'classnames';
import React      from 'react';


export default function ProgressBar({ percent, className, animate }) {
  const percentage = `${percent}%`;
  const style      = animate ? null : { width: percentage };

  const classNames = classnames('progress-bar', className, { animate });

  return (
    <div className={classNames}>
      <div className="progress-bar-fill" style={style}/>
    </div>
  );
}
