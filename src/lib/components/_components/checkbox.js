import './checkbox.less';

import Button     from '../components/button';
import classnames from 'classnames';
import PropTypes  from 'prop-types';
import React      from 'react';
import useDomId   from 'use-dom-id';

import { Check }  from 'react-feather';


export default function Checkbox({
  className,
  label,
  name,
  value,
  checked,
  disabled,
  onChange,
  top = false,
  ...buttonProps
}) {
  const classNames = classnames('checkbox', className, { top });
  const id         = useDomId('checkbox');

  // some mobile browsers don't fire onChange events on checkboxes reliably, so
  // we emulate the event using onClick on the label
  function onClick(event) {
    event.preventDefault();
    onChange({ target: { checked: !checked } });
  }

  return (
    <span className={classNames}>
      <input type="checkbox" {...{ id, name, value, disabled, checked, onChange }}/>
      <Button
        Tag="label"
        label={label}
        iconLeft={<Check/>}
        htmlFor={id}
        onClick={onClick}
        {...buttonProps}
      />
    </span>
  );
}


Checkbox.propTypes = {
  className: PropTypes.string,
  name:      PropTypes.string,
  value:     PropTypes.string,
  checked:   PropTypes.bool,
  disabled:  PropTypes.bool,
  onChange:  PropTypes.func.isRequired,
  label:     PropTypes.string,
};
