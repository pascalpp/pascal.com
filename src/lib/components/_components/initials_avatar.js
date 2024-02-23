import './initials_avatar.less';

import NotificationBadge from './notification_badge';
import React             from 'react';

// Circle with initials displayed
//
// name - Customer full name
export default function InitialsAvatar({ name = '', unreadCount }) {
  const initials = getInitials(name);
  return (
    <div className="user-avatar">
      {initials}
      <NotificationBadge count={unreadCount}/>
    </div>
  );
}

function getInitials(name) {
  if (!name)
    return '';

  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}
