import './toggle_switch.less';

import Button     from '../components/button';
import classnames from 'classnames';
import PropTypes  from 'prop-types';
import React      from 'react';


const defaultOptions = [
  { value: 'false', label: '' },
  { value: 'true', label: '' },
];

export default function ToggleSwitch({
  className,
  name,
  options = defaultOptions,
  value = options[0].value,
  checked = value === options[1].value,
  active = checked,
  disabled,
  onChange,
  label,
}) {
  const classNames = classnames('toggle-switch', className, { active, checked });

  function onClick(event) {
    // when clicking, send the other value in the change event
    const otherOption = options.find(option => option.value !== value);
    // eslint-disable-next-line no-param-reassign
    event.target.value = otherOption.value;
    onChange(event);
  }

  return (
    <Button
      type="button"
      name={name}
      label={label}
      value={value}
      onClick={onClick}
      className={classNames}
      disabled={disabled}
      renderNestedContent={false}
    >
      {options.map(option => <ToggleOption key={option.value} {...{ option, value, options }}/>)}
    </Button>
  );
}

ToggleSwitch.propTypes = {
  className: PropTypes.string,
  options:   PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  value:    PropTypes.string,
  checked:  PropTypes.bool,
  active:   PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label:    PropTypes.string,
};



function ToggleOption({ option, value, options }) {
  const active    = (option.value === value);
  const className = classnames('toggle-option', { active });
  const label     = React.useMemo(() => getLabel({ option, options }), [ option, options ]);
  return (
    <span className={className}>
      {label}
    </span>
  );
}


// if one label is shorter than the other, pad it with non-breaking spaces
function getLabel({ option, options }) {
  const { value, label } = option;
  const otherOption      = options.find(other => other.value !== value);
  const difference       = label.length - otherOption.label.length;
  if (difference >= 0)
    return label;
  else {
    // the character below is a non-breaking space (option-spacebar)
    const pad = ' '.repeat(Math.abs(difference));
    return (
      <>{pad}{label}{pad}</>
    );
  }
}
