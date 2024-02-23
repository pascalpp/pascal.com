import './verification_alert_card.less';

import * as Business  from '../business';
import AlertCard      from '../components/alert_card';
import Button         from '../components/button';
import React          from 'react';
import useRouteParams from '../hooks/use_route_params';


export default function VerificationAlertCard({ action = 'use this feature' }) {
  const { businessID }    = useRouteParams();
  const partiallyVerified = Business.useIsPartiallyVerified(businessID);
  const googleLink        = `/${businessID}/settings/business_profile/google`;
  const learnMoreLink     = 'https://broadlyhelp.force.com/s/article/Google-Business-Profile-Required-Broadly-Free-Trial';

  return (
    <AlertCard label="Verification Alert Card" icon={null} className="verification-alert-card">
      {partiallyVerified && (
        <p>You can {action} once we have verified your account. This usually takes less than 48 hours.</p>
      )}
      {!partiallyVerified && (
        <p>Please connect a verified Google Business Profile to {action}.</p>
      )}
      <Button.Row>
        {!partiallyVerified && <Button primary href={googleLink} label="Connect now"/>}
        <Button link nowrap href={learnMoreLink} label="Learn more"/>
      </Button.Row>
    </AlertCard>
  );
}
