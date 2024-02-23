import './max_review_requests_warning.less';

import * as Business     from '../business';
import { AlertTriangle } from 'react-feather';
import { connect }       from 'react-redux';
import AlertCard         from '../components/alert_card';
import classnames        from 'classnames';
import Column            from '../components/column';
import ContactUsButton   from '../components/contact_us_button';
import React             from 'react';


export default connect(
  (state, { businessID, ...otherProps }) => ({
    hasMaxReviewRequests: Business.hasMaxReviewRequests(state, businessID),
    limit:                Business.getReviewRequestsLimit(state, businessID),
    ...otherProps,
  }),
)(MaxReviewRequestsWarning);

function MaxReviewRequestsWarning({ limit, hasMaxReviewRequests, isBelowNavbar }) {
  if (!hasMaxReviewRequests)
    return null;

  const className = classnames('max-review-requests-warning', { 'is-below-navbar': isBelowNavbar });

  return (
    <Column center className={className}>
      <div className="warning-message">
        <AlertTriangle width={30} height={30}/>
        The monthly limit of {limit} review requests has been reached.
      </div>
      <ContactUsButton primary label="Contact us"/>
    </Column>
  );
}


export function MaxReviewRequestsAlertCard({ businessID }) {
  const limit = Business.useReviewRequestsLimit(businessID);
  return (
    <AlertCard type="warning" className="max-review-requests-alert">
      <Column left className="alert-content-wrapper">
        The monthly limit of {limit} review requests has been reached.
        <ContactUsButton primary label="Contact us"/>
      </Column>
    </AlertCard>
  );
}
