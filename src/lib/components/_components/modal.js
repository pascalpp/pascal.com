import './modal.less';

import { CSSTransition }  from 'react-transition-group';
import Button             from './button';
import classnames         from 'classnames';
import FocusTrap          from 'focus-trap-react';
import React              from 'react';
import ReactDOM           from 'react-dom';

import { X as CloseIcon } from 'react-feather';


const transitionClassNames = {
  enter:       'enter',
  enterActive: 'entered',
  enterDone:   'entered',
  exit:        'exit',
  exitActive:  'exited',
  exitDone:    'exited',
};

const transitionTime = 500;

const escapeKeys = [ 'Escape', 'Esc' ];
const enterKeys  = [ 'Enter' ];

export default function Modal({
  isOpen,
  children,
  className,
  onClick,
  onClickOverlay,
  label,
  title,
  showOverlay = true,
  showCloseButton = true,
  closeModal,
  onEscape = closeModal,
  onReturn = null,
  trapFocus = true,
  basic,
  titlebar,
}) {
  const ref        = React.useRef();
  const classNames = classnames('modal', className, { basic, titlebar });

  React.useEffect(function() {
    function listener(event) {
      if (onReturn && enterKeys.includes(event.key))
        onReturn();
      else if (onEscape && escapeKeys.includes(event.key))
        onEscape();
    }

    if (isOpen) {
      const timer = setTimeout(() => {
        // wait a moment before listening for keypresses
        document.addEventListener('keyup', listener);
      }, 500);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keyup', listener);
      };
    } else
      return () => {};
  }, [ isOpen, onReturn, onEscape ]);

  const focusTrapOptions = {
    initialFocus: '.modal-content',
  };

  const ariaLabel = label || title || 'Modal Dialog';

  function onClickCloseButton(event) {
    event.stopPropagation();
    closeModal();
  }

  return ReactDOM.createPortal((
    <CSSTransition in={isOpen} timeout={transitionTime} classNames={transitionClassNames} mountOnEnter unmountOnExit nodeRef={ref}>
      <FocusTrap focusTrapOptions={focusTrapOptions} active={trapFocus}>
        <div className={classNames} onClick={onClick} ref={ref}>
          {showOverlay && <div className="modal-overlay" onClick={onClickOverlay}/>}
          <div className="modal-container">
            <div className="modal-content" role="dialog" aria-modal="true" aria-label={ariaLabel} tabIndex="-1">
              {showCloseButton && closeModal && <CloseButton onClick={onClickCloseButton}/>}
              {title && <h2 className="modal-title">{title}</h2>}
              {children}
            </div>
          </div>
        </div>
      </FocusTrap>
    </CSSTransition>
  ), document.body);
}

function CloseButton({ onClick }) {
  return (
    <Button className="modal-close-button" onClick={onClick} label="Close dialog">
      <CloseIcon/>
    </Button>
  );
}
