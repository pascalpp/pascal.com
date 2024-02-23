import './setting.less';

import Card       from '../components/card';
import classnames from 'classnames';
import Column     from '../components/column';
import Editable   from '../components/editable';
import PropTypes  from 'prop-types';
import React      from 'react';


export default function Setting({ className, title, subtitle, input, label = title, ignoreSize = false }) {
  const classNames = classnames('setting', className, { 'ignore-size': ignoreSize });

  return (
    <span className={classNames} aria-label={label}>
      <span className="setting-text">
        {title && <span className="setting-title">{title}</span>}
        {subtitle && <span className="setting-subtitle">{subtitle}</span>}
      </span>
      {input && <span className="setting-input">{input}</span>}
    </span>
  );
}


Setting.propTypes = {
  className: PropTypes.string,
  title:     PropTypes.node,
  subtitle:  PropTypes.node,
  input:     PropTypes.node,
};


function SettingCard({ className, children, ...cardProps }) {
  const classNames = classnames('setting-card', className);

  return (
    <Card className={classNames} {...cardProps}>
      <Column className="setting-column">
        {children}
      </Column>
    </Card>
  );
}
Setting.Card = SettingCard;


function SettingDivider() {
  return (
    <hr className="setting-divider"/>
  );
}
Setting.Divider = SettingDivider;


function SettingTextarea({ className, currentValue, defaultValue, placeholder, save, ...settingProps }) {
  const classNames = classnames('setting-textarea', className);
  return (
    <Editable>
      <Setting
        className={classNames}
        subtitle={(
          <>
            <Editable.Viewing>
              {currentValue || defaultValue}
            </Editable.Viewing>
            <Editable.Editing>
              <Editable.EditTextarea {...{ currentValue, defaultValue, placeholder, save }}/>
            </Editable.Editing>
          </>
        )}
        input={(
          <Editable.Viewing>
            <Editable.EditButton tiny secondary/>
          </Editable.Viewing>
        )}
        {...settingProps}
      />
    </Editable>
  );
}
Setting.Textarea = SettingTextarea;
