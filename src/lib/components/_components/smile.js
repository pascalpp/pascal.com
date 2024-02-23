import './smile.less';

import childrenOfType from '../util/children_of_type';
import classnames     from 'classnames';
import React          from 'react';


export default function Smile({ className, children }) {
  const classNames = classnames('smile', className);

  return (
    <div className={classNames}>
      <div className="smile-top">
        {childrenOfType(children, SmileTop)}
      </div>
      <div className="smile-bottom">
        {childrenOfType(children, SmileBottom)}
      </div>
    </div>
  );
}


function SmileTop({ children }) {
  return children || null;
}
Smile.Top = SmileTop;

function SmileBottom({ children }) {
  return children || null;
}
Smile.Bottom = SmileBottom;
