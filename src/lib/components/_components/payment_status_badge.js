import './payment_status_badge.less';

import classnames         from 'classnames';
import React              from 'react';

import CircleCheck        from '../assets/icons/circle_check.svg';
import CircleDollar       from '../assets/icons/circle_dollar.svg';
import CircleDollarRefund from '../assets/icons/circle_dollar_refund.svg';
import CircleHollow       from '../assets/icons/circle_hollow.svg';
import CirclePartial      from '../assets/icons/circle_partial.svg';
import CircleRightArrow   from '../assets/icons/circle_right_arrow.svg';
import CircleVoid         from '../assets/icons/circle_void.svg';
import CircleX            from '../assets/icons/circle_x.svg';

const statusLabels = {
  new:       'New',
  sent:      'Sent',
  partial:   'Partial',
  paid:      'Paid',
  accepted:  'Accepted',
  declined:  'Declined',
  expired:   'Expired',
  converted: 'Converted',
  refunded:  'Refunded',
  void:      'Void',
};

const invoiceStatusLabels = {
  ...statusLabels,
  new:  'Unpaid',
  sent: 'Unpaid',
};

const statusIcons = {
  new:       <CircleHollow/>,
  sent:      <CircleHollow/>,
  partial:   <CirclePartial/>,
  paid:      <CircleDollar/>,
  accepted:  <CircleCheck/>,
  declined:  <CircleX/>,
  expired:   <CircleX/>,
  converted: <CircleRightArrow/>,
  refunded:  <CircleDollarRefund/>,
  void:      <CircleVoid/>,
};

export default function PaymentStatusBadge({
  invoice,
  quote,
  status = getStatus({ invoice, quote }),
  label = getLabel({ invoice, status }),
  icon = statusIcons[status],
  pill = false,
  className,
}) {
  const classNames = classnames('payment-status-badge', className, status, { pill });

  return (
    <div className={classNames}>
      {icon && (
        <span className="status-icon">{icon}</span>
      )}
      {label && (
        <span className="status-label">{label}</span>
      )}
    </div>
  );
}

function getStatus({ invoice, quote }) {
  return invoice?.status || quote?.status;
}

function getLabel({ invoice, status }) {
  const labels = invoice ? invoiceStatusLabels : statusLabels;
  return labels[status];
}
