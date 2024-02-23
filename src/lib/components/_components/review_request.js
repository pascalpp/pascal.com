import * as Business   from '../business';
import * as Contacts   from '../contacts';
import * as UI         from '../ui';
import AlertModal      from '../components/alert_modal';
import Button          from '../components/button';
import ContactUsButton from './contact_us_button';
import React           from 'react';
import useBoolean      from '../hooks/use_boolean';
import uuidv4          from 'uuid/v4';


// Provides logic for sending a review request, considering account limits.
// Receives either a contact or a conversation.
//
// Usage:
//
//   <ReviewRequest business={business} contact={contact}>
//     (({ onClick }) => (
//       <Button onClick={onClick} label="Request a Review"/>
//     ))
//   </ReviewRequest>
//
export default function ReviewRequest({ business, contact, conversation, children }) {
  const businessID                = business.id;
  const customer                  = contact ? contact : conversation.customers[0];
  const isUnsubscribedCustomer    = !customer.contact.subscribed;
  const conversationID            = conversation?.id ?? contact.conversation?.id;
  const customerID                = customer.id;
  const hasMaxReviewRequests      = Business.useHasMaxReviewRequests(businessID);
  const reviewRequestsLimit       = Business.useReviewRequestsLimit(businessID);
  const [ clientID, setClientID ] = React.useState(() => uuidv4());
  const sendThankYouMessage       = Contacts.useSendThankYouMessage();

  const [ confirmModalIsOpen, openConfirmModal, closeConfirmModal ]               = useBoolean(false);
  const [ maxRequestsModalIsOpen, openMaxRequestsModal, closeMaxRequestsModal ]   = useBoolean(false);
  const [ unsubcribedModalIsOpen, openUnsubscribedModal, closeUnsubscribedModal ] = useBoolean(false);

  async function onConfirm() {
    try {
      await sendThankYouMessage({ businessID, conversationID, customerID, clientID });
    } catch (error) {
      UI.errorAlert(error.body?.message ?? 'Oops. Something went wrong. Please try again.');
    } finally {
      // Generate new client ID after each request
      setClientID(uuidv4());
      closeConfirmModal();
    }
  }

  const name = customer?.name?.full || 'this contact';

  function onClick() {
    if (hasMaxReviewRequests)
      openMaxRequestsModal();
    else if (isUnsubscribedCustomer)
      openUnsubscribedModal();
    else
      openConfirmModal();
  }

  return (
    <>
      {children({ onClick })}

      <SendRequestConfirmModal
        name={name}
        isOpen={confirmModalIsOpen}
        closeModal={closeConfirmModal}
        onConfirm={onConfirm}
      />
      <MaxReviewRequestsModal
        limit={reviewRequestsLimit}
        isOpen={maxRequestsModalIsOpen}
        closeModal={closeMaxRequestsModal}
      />
      <UnsubscribedReviewRequestsModal
        isOpen={unsubcribedModalIsOpen}
        closeModal={closeUnsubscribedModal}
      />
    </>
  );
}

function SendRequestConfirmModal({ isOpen, name, closeModal, onConfirm }) {
  return (
    <AlertModal
      isOpen={isOpen}
      onEscape={closeModal}
      onReturn={onConfirm}
      showCloseButton={false}
      title="Send review request?"
      message={(
        <>
          You’re about to send a review request to <strong className="truncate">{name}.</strong><br/>
        </>
      )}
      buttons={(
        <Button.Row spread>
          <Button wide secondary label="Cancel" onClick={closeModal}/>
          <Button wide primary label="Send Request" onClick={onConfirm}/>
        </Button.Row>
      )}
    />
  );
}

function MaxReviewRequestsModal({ isOpen, closeModal, limit = '' }) {
  return (
    <AlertModal
      isOpen={isOpen}
      onEscape={closeModal}
      onReturn={closeModal}
      title="Monthly Limit Reached"
      message={(<>The monthly limit of {limit} review requests has been reached.</>)}
      buttons={<ContactUsButtonRow {...{ closeModal }}/>}
    />
  );
}


function ContactUsButtonRow({ closeModal }) {
  return (
    <Button.Row spread>
      <Button secondary label="Not now" onClick={closeModal}/>
      <ContactUsButton wide primary label="Contact us" onClick={closeModal}/>
    </Button.Row>
  );
}


function UnsubscribedReviewRequestsModal({ isOpen, closeModal }) {
  return (
    <AlertModal
      type="warning"
      isOpen={isOpen}
      onEscape={closeModal}
      onReturn={closeModal}
      title="Contact Unsubscribed"
      message="This contact has unsubscribed from review requests."
    />
  );
}
