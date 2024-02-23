import './spoke_spinner.less';

import classnames from 'classnames';
import React      from 'react';
import Spokes     from './spoke_spinner.svg';


export default function SpokeSpinner({ label, fill }) {
  const classNames = classnames('spoke-spinner', { fill });
  return (
    <div className={classNames}>
      <Spokes/>
      {label && <span className="label">{label}</span>}
    </div>
  );
}
