import * as UI         from '../ui';
import { useDispatch } from 'react-redux';
import React           from 'react';


// Wait for resources or arbitrary predicates.
// Pass progress=true to show the progress indicator
// while waiting.
export default function WaitFor({ statuses, predicate, children, fallback = null, progress = false }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!progress)
      return () => {};
    else if (predicate)
      return () => {};
    else {
      dispatch(UI.progressStart());
      return () => {
        dispatch(UI.progressEnd());
      };
    }
  }, [ progress, predicate, dispatch ]);

  if (statuses) {
    return (
      <WaitForStatuses statuses={statuses}>
        {children}
      </WaitForStatuses>
    );
  } else if (predicate)
    return children;
  else
    return fallback;
}


function WaitForStatuses({ statuses, children }) {
  const isReady = areStatusesReady(statuses);
  return (
    <WaitFor predicate={isReady}>
      {children}
    </WaitFor>
  );
}


export function areStatusesReady(...statuses) {
  return statuses.every(isStatusReady);
}

function isStatusReady(status) {
  if (Array.isArray(status))
    return status.every(isStatusReady);
  else if (status instanceof Object)
    return status.readStatus?.succeeded ?? false;
  else
    return false;
}
