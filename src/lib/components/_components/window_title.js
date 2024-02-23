import * as Business  from '../business';
import * as UI        from '../ui';
import * as User      from '../user';
import React          from 'react';
import useRouteParams from '../hooks/use_route_params';

const appName = 'Broadly';

export default function WindowTitle() {
  const { businessID } = useRouteParams();

  const badgeCount   = User.useBadgeCount();
  const notification = UI.useNotification();
  const businessName = Business.useBusinessName(businessID);

  React.useEffect(function updateTitle() {
    const badge = getBadge({ badgeCount, notification });
    const title = getWindowTitle(businessName);
    if (badge)
      window.document.title = `(${badge}) ${title}`;
    else
      window.document.title = title;
  }, [ badgeCount, notification, businessName ]);

  return null;
}


function getBadge({ badgeCount, notification }) {
  if (badgeCount > 0)
    return badgeCount;
  else if (notification.isOpen)
    return '•';
  else
    return undefined;
}


function getWindowTitle(businessName) {
  return businessName ? `${appName} - ${businessName}` : appName;
}
