import Badge from './badge';
import React from 'react';


// render a badge with the given count, ignoring 0

export default function NotifcationBadge({ count }) {
  if (count > 0)
    return <Badge small type="notification-badge">{count}</Badge>;
  else
    return null;
}
