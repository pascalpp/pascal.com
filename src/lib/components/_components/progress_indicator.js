import './progress_indicator.less';

import * as UI           from '../ui';
import { CSSTransition } from 'react-transition-group';
import React             from 'react';

const transitionClassNames = {
  enter:       'enter',
  enterActive: 'entered',
  enterDone:   'entered',
  exit:        'exit',
  exitActive:  'exited',
  exitDone:    'exited',
};

const transitionTime = 500;


export default function ProgressMonitor() {
  const ref        = React.useRef();
  const inProgress = UI.useIsInProgress();

  return (
    <CSSTransition in={inProgress} timeout={transitionTime} classNames={transitionClassNames} mountOnEnter unmountOnExit nodeRef={ref}>
      <div className="progress-indicator" ref={ref}>
        <div className="progress-spinner"/>
      </div>
    </CSSTransition>
  );
}
