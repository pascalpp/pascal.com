import './sheet_modal.less';

import classnames from 'classnames';
import Modal      from '../components/modal';
import React      from 'react';


export default function SheetModal({
  title,
  label = title,
  className,
  children,
  isOpen,
  onReturn,
  onEscape,
  ...modalProps
}) {
  const classNames = classnames('sheet-modal', className);

  return (
    <Modal
      basic
      className={classNames}
      isOpen={isOpen}
      showCloseButton={false}
      title={title}
      label={label}
      onReturn={onReturn}
      onEscape={onEscape}
      {...modalProps}
    >
      {children}
    </Modal>
  );
}
