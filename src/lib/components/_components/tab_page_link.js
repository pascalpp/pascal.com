import './tab_page_link.less';

import Button            from '../components/button';
import classnames        from 'classnames';
import Column            from '../components/column';
import NotificationBadge from '../components/notification_badge';
import React             from 'react';

import { ChevronRight }  from 'react-feather';


export default function TabPageLink({
  badgeCount,
  icon,
  title,
  subtitle,
  label = title,
  active,
  className,
  iconRight = <ChevronRight/>,
  ...buttonProps
}) {
  const classNames = classnames('tab-page-link', className, { active });

  return (
    <Button className={classNames} label={label} renderNestedContent={false} {...buttonProps}>
      {icon && (
        <span className="icon">{icon}</span>
      )}
      <Column className="text-rows">
        <div className="title">
          {title}<NotificationBadge count={badgeCount}/>
        </div>
        {subtitle && (
          <div className="subtitle">{subtitle}</div>
        )}
      </Column>
      {iconRight && <span className="icon-right">{iconRight}</span>}
    </Button>
  );
}
