import './select_dropdown.less';

import { isOptionSelected } from '../hooks/use_selected';
import Button               from '../components/button';
import classnames           from 'classnames';
import Dropdown             from '../components/dropdown';
import React                from 'react';
import useBoolean           from '../hooks/use_boolean';


import { Check }            from 'react-feather';
import SelectTriangle       from '../assets/icons/select_triangle.svg';


const blinkDuration = 200;

export default function SelectDropdown({
  options,   // [{ value, label }, ...]
  selected,  // string or [string]
  filteredOptions,
  className,
  loading,
  iconLeft,
  getTitle = getDefaultTitle,
  onSelect = defaultOnSelect,
  Header = SelectHeader,
  headerProps,
  Item = SelectItem,
  children,
  ...dropdownProps
}) {
  const classNames = classnames('select-dropdown', className);

  const selectedOptions = React.useMemo(() => {
    return options?.filter(option => isOptionSelected(option, selected));
  }, [ options, selected ]);

  const renderedOptions = (filteredOptions || options);

  return (
    <Dropdown className={classNames} {...dropdownProps}>
      <Header {...{ options, filteredOptions, selectedOptions, iconLeft, loading, getTitle, headerProps }}/>
      <Dropdown.Content>
        {children}
        {renderedOptions?.map(option => <Item key={option.value} {...option} {...{ selected, onSelect }}/>)}
      </Dropdown.Content>
    </Dropdown>
  );
}


function SelectHeader({ options, selectedOptions, iconLeft, loading, getTitle, headerProps }) {
  const { label, disabled, toggleDropdown } = Dropdown.useContext();

  const title = options ? getTitle(options, selectedOptions) : label;

  const ref                 = React.useRef();
  const [ width, setWidth ] = React.useState(0);

  React.useEffect(function setMinWidthOnTitleChange() {
    setWidth(ref.current.offsetWidth);
  }, [ title ]);

  React.useEffect(function resetMinWidthOnOptionsChange() {
    if (!options)
      setWidth(0);
  }, [ options ]);

  const style = { '--min-width': `${width}px` };

  return (
    <Button
      type="button"
      ref={ref}
      style={style}
      secondary
      loading={loading}
      className="dropdown-header"
      onClick={toggleDropdown}
      iconRight={<SelectTriangle/>}
      {...{ label, disabled, iconLeft }}
      {...headerProps}
    >
      {title}
    </Button>
  );
}


export function getDefaultTitle(options, selectedOptions) {
  const isSingle   = selectedOptions.length === 1;
  const isMultiple = selectedOptions.length > 1;

  if (isMultiple)
    return `${selectedOptions.length} items selected`;
  else if (isSingle)
    return selectedOptions[0].label;
  else
    return 'Select one…';
}


function SelectItem({ value, label, selected, onSelect, ...rest }) {
  const [ blinking, startBlinking, stopBlinking ] = useBoolean(false);

  const { closeDropdown } = Dropdown.useContext();

  async function onClick(event) {
    event.persist();
    await onSelect(event);

    startBlinking();
    // delay to allow for visual confirmation of selection
    await new Promise(resolve => setTimeout(resolve, blinkDuration));
    stopBlinking();

    if (!event.defaultPrevented)
      closeDropdown();
  }

  const checked   = isOptionSelected({ value }, selected);
  const iconLeft  = checked ? <Check/> : null;
  const className = classnames('dropdown-option', { blinking });

  return (
    <Button {...{ onClick, value, className, label, iconLeft }} {...rest}/>
  );
}


export function DeselectAllButton({ selected, setSelected, label = 'Deselect All' }) {
  const { closeDropdown } = Dropdown.useContext();

  function onClick() {
    setSelected([]);
    closeDropdown();
  }

  const disabled = (selected.length === 0);

  return (
    <Button className="deselect-all-button" {...{ label, onClick, disabled }}/>
  );
}


function defaultOnSelect(event) {
  // eslint-disable-next-line no-console
  console.log('Selected:', event.target.value);
}
