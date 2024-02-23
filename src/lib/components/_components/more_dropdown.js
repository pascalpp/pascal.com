import './more_dropdown.less';

import classnames                   from 'classnames';
import Dropdown                     from '../components/dropdown';
import React                        from 'react';

import { MoreVertical as MoreIcon } from 'react-feather';


export default function MoreDropdown({ className, children, ...dropdownProps }) {
  const classNames = classnames('more-dropdown', className);

  return (
    <Dropdown className={classNames} {...dropdownProps}>
      <Dropdown.Header>
        <MoreIcon/>
      </Dropdown.Header>
      <Dropdown.Content>
        {children}
      </Dropdown.Content>
    </Dropdown>
  );
}
