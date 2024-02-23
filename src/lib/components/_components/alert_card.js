import './alert_card.less';

import Card              from './card';
import classnames        from 'classnames';
import Column            from './column';
import PropTypes         from 'prop-types';
import React             from 'react';
import Row               from './row';

import { AlertCircle }   from 'react-feather';
import { AlertTriangle } from 'react-feather';
import { Check }         from 'react-feather';
import { Info }          from 'react-feather';

const alertTypes = [
  'tip',
  'info',
  'warning',
  'success',
  'error',
  'important',
];

export default function AlertCard({
  type = 'info',
  icon = getIcon(type),
  children,
  className,
  label,
}) {
  const classNames = classnames('alert-card', `alert-type-${type}`, className);

  return (
    <Card className={classNames} aria-label={label}>
      <Row top>
        {icon && <div className="alert-icon">{icon}</div>}
        <Column className="alert-content">
          {children}
        </Column>
      </Row>
    </Card>
  );
}

AlertCard.propTypes = {
  type:     PropTypes.oneOf(alertTypes),
  icon:     PropTypes.element,
  children: PropTypes.any.isRequired,
};


function getIcon(type) {
  switch (type) {
    case 'warning':
    case 'important':
      return <AlertCircle/>;
    case 'error':
      return <AlertTriangle/>;
    case 'success':
      return <Check/>;
    default:
      return <Info/>;
  }
}
