import './alert_modal.less';

import * as UI           from '../ui';
import Button            from '../components/button';
import classnames        from 'classnames';
import Column            from '../components/column';
import Modal             from '../components/modal';
import React             from 'react';

import { AlertTriangle } from 'react-feather';
import { Check }         from 'react-feather';

const icons = {
  error:   <AlertTriangle/>,
  success: <Check/>,
};

// you probably don't want to use this component directly. Use UI.alert,
// UI.errorAlert, and UI.successAlert instead.

export default function AlertModal({
  message,
  title,
  type,
  icon = icons[type],
  label,
  buttonLabel = 'OK',
  buttons,
  className,
  isOpen,
  onReturn,
  onEscape,
  ...modalProps
}) {
  const classNames = classnames('alert-modal', className, type);

  const danger  = type === 'error';
  const success = type === 'success';

  return (
    <Modal
      basic
      className={classNames}
      isOpen={isOpen}
      showCloseButton={false}
      label={label || title}
      onReturn={onReturn}
      onEscape={onEscape}
      {...modalProps}
    >
      <Column center>
        {icon && <div className="alert-icon">{icon}</div>}
        {title && <h2 className="alert-title">{title}</h2>}
        <div className="alert-message">{message}</div>
        {buttons || <Button wide className="close-alert-button" label={buttonLabel} primary onClick={onReturn} {...{ danger, success }}/>}
      </Column>
    </Modal>
  );
}


export function AlertMonitor() {
  const props = UI.useAlert();

  return (
    <AlertModal {...props}/>
  );
}
