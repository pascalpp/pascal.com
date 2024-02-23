import './card.less';

import classnames from 'classnames';
import React      from 'react';

const Card = React.forwardRef(function Card({ className, children, shadow = false, ...rest }, ref) {
  const classNames = classnames('card', className, { shadow });

  return (
    <div className={classNames} {...rest} ref={ref}>
      {children}
    </div>
  );
});

export default Card;
