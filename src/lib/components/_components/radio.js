import './radio.less';

import Button     from '../components/button';
import classnames from 'classnames';
import PropTypes  from 'prop-types';
import React      from 'react';
import Setting    from '../components/setting';

import { Check }  from 'react-feather';


export default function Radio({
  className,
  title,
  subtitle,
  label = title,
  name,
  value,
  checked,
  disabled,
  onChange,
}) {
  const classNames = classnames('radio-button', className, { checked });

  return (
    <Button Tag="label" disabled={disabled} label={label} className={classNames} renderNestedContent={false}>
      <Setting
        className="radio"
        title={title}
        subtitle={subtitle}
        input={(
          <span className="radio-input">
            <input type="radio" {...{ name, value, checked, disabled, onChange }}/>
            <Check/>
          </span>
        )}
        ignoreSize
      />
    </Button>
  );
}


Radio.propTypes = {
  className: PropTypes.string,
  name:      PropTypes.string,
  value:     PropTypes.string,
  checked:   PropTypes.bool,
  disabled:  PropTypes.bool,
  onChange:  PropTypes.func.isRequired,
  label:     PropTypes.string,
  title:     PropTypes.node,
  subtitle:  PropTypes.node,
};
