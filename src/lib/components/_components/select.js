import './select.less';

import Button     from '../components/button';
import classnames from 'classnames';
import PropTypes  from 'prop-types';
import React      from 'react';

const Select = React.forwardRef(function Select({ className, children, options, ...buttonProps }, ref) {
  const classNames = classnames('select', className);

  return (
    <Button secondary className={classNames} Tag="select" {...buttonProps} ref={ref}>
      {children}
      {options?.map(option => <option key={option.value} {...option}>{option.label}</option>)}
    </Button>
  );
});

export default Select;

Select.propTypes = {
  className: PropTypes.string,
  options:   PropTypes.arrayOf(PropTypes.shape({
    value:    PropTypes.string.isRequired,
    label:    PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label:    PropTypes.string,
};
