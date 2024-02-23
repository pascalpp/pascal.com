import './signup_page.less';

import Column from './column';
import React  from 'react';
import Row    from './row';


// Page styles for signup, and account creation flow.
export default function SignupPage({ children, icon, title, subtitle, step }) {
  return (
    <Column center className="page-content">
      <Column className="signup-content">
        <Header {...{ icon, title, subtitle, step }}/>
        {children}
      </Column>
    </Column>
  );
}


function Header({ icon, title, subtitle, step }) {
  const showHeader = icon || title || subtitle || step;

  if (showHeader) {
    return (
      <Column className="page-header">
        {icon && <div className="page-icon">{icon}</div>}
        {step && <StepProgress {...{ step }}/>}
        {title && <h1 className="page-title">{title}</h1>}
        {subtitle && <div className="page-subtitle">{subtitle}</div>}
      </Column>
    );
  } else
    return null;
}


function StepProgress({ step }) {
  // create an array of classNames
  // - e.g. ['step-dot complete', 'step-dot', 'step-dot']

  const steps = 4;
  const dots  = Array.from({ length: steps });
  dots.fill('step-dot');
  dots.fill('step-dot complete', 0, step);

  return (
    <Row className="step-progress">
      {dots.map((className, index) => <div key={index} className={className}/>)}
    </Row>
  );
}
