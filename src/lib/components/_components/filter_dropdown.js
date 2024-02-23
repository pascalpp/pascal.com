import './filter_dropdown.less';

import Button         from '../components/button';
import classnames     from 'classnames';
import React          from 'react';
import SelectDropdown from '../components/select_dropdown';
import useInput       from '../hooks/use_input';


export default function FilterDropdown({
  options,
  className,
  placeholder = 'Filter items…',
  children,
  ...dropdownProps
}) {
  const [ value, onChange, reset ] = useInput('');

  const filterOption = React.useCallback(option => {
    return option.label.toLowerCase().includes(value.toLowerCase());
  }, [ value ]);

  const filteredOptions = (value && options.filter(filterOption));
  const showNoMatches   = (value && filteredOptions.length === 0);

  const classNames = classnames('filter-dropdown', className);
  return (
    <SelectDropdown options={options} filteredOptions={filteredOptions} className={classNames} {...dropdownProps}>
      <input className="filter" type="search" {...{ value, onChange, placeholder }}/>
      {showNoMatches && <Button className="no-matches" onClick={reset} label="No matches"/>}
      {!filteredOptions && children}
    </SelectDropdown>
  );
}
