import './tooltip.less';

import { CSSTransition } from 'react-transition-group';
import { isPuppeteer }   from '../util/env';
import classnames        from 'classnames';
import React             from 'react';
import useBoolean        from '../hooks/use_boolean';


// Tooltip
//
// Usage:
// <Tooltip>
//   hover me or tap me
//   <Tooltip.Content>This will appear on hover or tap.</Tooltip.Content>
// </Tooltip>

const transitionClassNames = {
  enter:       'enter',
  enterActive: 'entered',
  enterDone:   'entered',
  exit:        'exit',
  exitActive:  'exited',
  exitDone:    'exited',
};

const TooltipContext = React.createContext();

export default function Tooltip({ children, className, label }) {
  const ref = React.useRef();

  const [ tooltipIsOpen, openTooltip, closeTooltip, toggleTooltip ] = useBoolean(false);

  const context = React.useMemo(
    () => ({ tooltipIsOpen, openTooltip, closeTooltip, toggleTooltip }),
    [ tooltipIsOpen, openTooltip, closeTooltip, toggleTooltip ],
  );

  const classNames        = classnames('broadly-tooltip', className);
  const transitionTimeout = isPuppeteer() ? 0 : 200;

  return (
    <TooltipContext.Provider value={context}>
      <span className={classNames} onClick={openTooltip} onMouseEnter={openTooltip} aria-label={label} role="tooltip">
        <CSSTransition in={tooltipIsOpen} timeout={transitionTimeout} classNames={transitionClassNames} nodeRef={ref}>
          <span className="tooltip-transition" ref={ref}>
            {children}
            <span className="tooltip-triangle"/>
          </span>
        </CSSTransition>
      </span>
    </TooltipContext.Provider>
  );
}


function TooltipContent({ children }) {
  const { tooltipIsOpen, closeTooltip } = React.useContext(TooltipContext);
  const ref                             = React.useRef();

  React.useEffect(function closeTooltipWhenClickedOutside() {
    function clickListener(event) {
      const clickedOutside = !ref.current.contains(event.target);
      if (clickedOutside) {
        event.stopPropagation();
        closeTooltip();
      }
    }

    if (tooltipIsOpen)
      document.body.addEventListener('click', clickListener);

    return () => {
      document.body.removeEventListener('click', clickListener);
    };
  }, [ closeTooltip, tooltipIsOpen ]);

  return (
    <div className="tooltip-content" ref={ref}>
      <div className="tooltip-bubble">{children}</div>
    </div>
  );
}


function useDropdowContext() {
  return React.useContext(TooltipContext);
}


Tooltip.Content    = TooltipContent;
Tooltip.Context    = TooltipContext;
Tooltip.useContext = useDropdowContext;
