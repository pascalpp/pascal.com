import './shimmer.less';

import React from 'react';


// width is an integer between 0 and 100, to be used as a percentage

export default function Shimmer({ width }) {
  const style = { width: `${width}%` };
  return (
    <span className="shimmer">
      <span className="shimmer-text" style={style}>&nbsp;</span>
    </span>
  );
}
