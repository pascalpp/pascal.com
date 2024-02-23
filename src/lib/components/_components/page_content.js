import './page_content.less';

import classnames from 'classnames';
import React      from 'react';
import Size       from '../components/size';


const sizes = [
  { className: 'page-content-size-small', threshold: 680 },
  { className: 'page-content-size-large', threshold: Infinity },
];

export default function PageContent({
  className,
  children,
  scrollable = true,
  padded = false,
  unpadded = false,
  centered = false,
  grey = false,
  blue = false,
  white = false,
}) {
  const classNames = classnames('page-contentx', className, { scrollable, unpadded, padded, centered, grey, blue, white });

  return (
    <Size className="page-content-size" sizes={sizes}>
      <div className={classNames}>
        {children}
      </div>
    </Size>
  );
}
