import './a2p_modal.less';

import * as Business   from '../business';
import * as User       from '../user';
import AlertModal      from '../components/alert_modal';
import Button          from '../components/button';
import Column          from '../components/column';
import ExternalLink    from './external_link';
import React           from 'react';
import SmsIllustration from './sms_illustration';
import useBoolean      from '../hooks/use_boolean';
import useCurrentRoute from '../hooks/use_current_route';
import useLocalStorage from '../hooks/use_local_storage';
import useRouteParams  from '../hooks/use_route_params';


export const a2pModalKey = '2023-07-25-a2p-modal-dismissed';
export const a2pFailedModalKey = '2023-08-08-a2p-error-modal-dismissed';
export const a2pHelpUrl = 'https://broadly.my.site.com/s/article/SMS-Registration-FAQs';
const campaignFailureDescription = 'Campaign verification failed';


export default function A2PModalMonitor() {
  const route                               = useCurrentRoute();
  const { businessID }                      = useRouteParams();
  const twilioA2PStatus                     = Business.useTwilioA2PStatus(businessID);
  const canRegister                         = Business.useCanRegisterForA2P(businessID);
  const isAdmin                             = User.useIsAdmin(businessID);
  const [ remindMeLater, setRemindMeLater ] = React.useState(false);

  const needsToRegister    = useNeedsToRegister({ twilioA2PStatus, canRegister, isAdmin });
  const registrationFailed = useRegistrationFailed({ twilioA2PStatus, canRegister, isAdmin });

  if (needsToRegister || registrationFailed)
    return <A2PModal {...{ route, businessID, registrationFailed, remindMeLater, setRemindMeLater }}/>;
  else
    return null;
}


function useNeedsToRegister({ twilioA2PStatus, canRegister, isAdmin }) {
  const isInProgress    = twilioA2PStatus?.status === 'in-progress';
  const isFailed        = twilioA2PStatus?.status === 'failed';
  const isCompleted     = twilioA2PStatus?.status === 'completed';
  const needsToRegister = twilioA2PStatus && (!isInProgress && !isFailed && !isCompleted);

  return (isAdmin && canRegister && needsToRegister);
}


function useRegistrationFailed({ twilioA2PStatus, canRegister, isAdmin }) {
  const isFailed          = twilioA2PStatus?.status === 'failed';
  const isCampaignFailure = (isFailed && twilioA2PStatus?.statusDescription === campaignFailureDescription);
  const needsToFixErrors  = twilioA2PStatus && isFailed && !isCampaignFailure;

  return (isAdmin && canRegister && needsToFixErrors);
}


function A2PModal({ route, businessID, registrationFailed, remindMeLater, setRemindMeLater }) {
  const key = registrationFailed ? a2pFailedModalKey : a2pModalKey;

  const [ isOpen, openModal, closeModal ] = useBoolean(false);
  const [ isDismissed, setIsDismissed ]   = useLocalStorage(key, false);

  const messagingHref    = `/${businessID}/settings/messaging`;
  const registrationHref = `/${businessID}/settings/messaging/sms_registration`;
  const isAlreadyAtHref  = route?.url.startsWith(messagingHref);

  const href               = registrationFailed ? registrationHref : messagingHref;
  const title              = registrationFailed ? 'Update your SMS registration' : 'Complete your SMS registration';
  const primaryButtonLabel = registrationFailed ? 'Update now' : 'Register now';

  React.useEffect(function openOnMount() {
    if (!isDismissed && !remindMeLater && !isAlreadyAtHref)
      openModal();
  }, [ isDismissed, remindMeLater, isAlreadyAtHref, openModal ]);

  function onClickRemindMeLater() {
    closeModal();
    setRemindMeLater(true);
  }

  function onClickRegisterNow() {
    closeModal();
    setIsDismissed(true);
  }

  return (
    <AlertModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="a2p-modal"
      title={title}
      icon={<SmsIllustration/>}
      message={registrationFailed ? <RegistrationFailedMessage/> : <RegisterMessage/>}
      buttons={(
        <Button.Row mobileStack>
          <Button
            secondary
            label="Remind me later"
            onClick={onClickRemindMeLater}
          />
          <Button
            primary
            wide
            label={primaryButtonLabel}
            href={href}
            onClick={onClickRegisterNow}
          />
        </Button.Row>
      )}
    />
  );
}


function RegisterMessage() {
  return (
    <Column left>
      <p>
        To prevent spam and other abuse, phone carriers now require
        businesses to register their phone numbers before sending SMS
        messages to customers.
      </p>
      <p>
        To avoid a block on your SMS services, please complete your
        registration as soon as possible. Once you register, the approval
        process may take a week or more to complete. <ExternalLink
          href={a2pHelpUrl} label="Learn more"/>
      </p>
    </Column>

  );
}


function RegistrationFailedMessage() {
  return (
    <Column left>
      <p>
        There was an issue with your SMS registration. Please update your
        registration immediately to prevent any disruptions to your SMS
        messaging. <ExternalLink href={a2pHelpUrl} label="Learn more"/>
      </p>
    </Column>
  );
}
