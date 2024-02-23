import './toast.less';

import * as UI    from '../ui';
import Modal      from '../components/modal';
import React      from 'react';
import useBoolean from '../hooks/use_boolean';


export default function Toast() {
  const [ isOpen, open, close ] = useBoolean(false);

  const toast = UI.useToast();

  React.useEffect(function onToastChange() {
    if (toast?.text) {
      open();
      const timer = setTimeout(close, UI.toastDuration);
      return () => clearTimeout(timer);
    } else {
      close();
      return () => {};
    }
  }, [ toast, close, open ]);

  return (
    <Modal
      isOpen={isOpen}
      className="toast"
      showOverlay={false}
      onEscape={close}
      trapFocus={false}
    >
      {toast?.text}
    </Modal>
  );
}
