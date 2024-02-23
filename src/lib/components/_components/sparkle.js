import './sparkle.less';

import classnames                from 'classnames';
import React                     from 'react';
import SparkleBackground         from '../assets/images/bg-sparkle1.svg';
import SparkleBackgroundInverted from '../assets/images/bg-sparkle2.svg';


export default function Sparkle({ className, invert, children }) {
  const Background = invert ? SparkleBackgroundInverted : SparkleBackground;
  const classNames = classnames('sparkle', className);

  return (
    <div className={classNames}>
      <Background className="sparkle-background"/>
      <div className="sparkle-content">
        {children}
      </div>
    </div>
  );
}
