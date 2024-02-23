import './notification.less';

//  Notification received while app in background: OS/Firebase will intercept
//  and show in notification center.  If user clicks notification, opens app to
//  click_action URL.
//
//  Notification received while app in foreground: added to store, and should
//  show notification in app.  If user clicks notification, redirect to
//  click_action URL.

import * as UI         from '../ui';
import Button          from '../components/button';
import Column          from '../components/column';
import Modal           from '../components/modal';
import React           from 'react';
import rollbar         from '../rollbar';
import useCurrentRoute from '../hooks/use_current_route';

export default function Notification() {
  const notification      = UI.useNotification();
  const closeNotification = UI.useUnsetNotification();
  const route             = useCurrentRoute();

  const { isOpen, title, body, url } = notification;

  const relativePath     = url && getRelativePath(url);
  const isCurrentPage    = route && url && route.path === relativePath;
  const showNotification = isOpen && !isCurrentPage;

  React.useEffect(function() {
    if (isOpen)
      playNotificationSound();
  }, [ isOpen ]);

  React.useEffect(function() {
    if (isOpen && !showNotification)
      closeNotification();
  }, [ isOpen, showNotification, closeNotification ]);

  return (
    <Modal
      isOpen={showNotification}
      className="notification-modal"
      showOverlay={false}
      closeModal={closeNotification}
      onEscape={null}
      trapFocus={false}
    >
      <Button
        href={relativePath}
        onClick={closeNotification}
        label="Notification"
        className="notification-content"
        renderNestedContent={false}
      >
        <Column className="notification-column">
          <p className="notification-title">{title}</p>
          <p className="notification-body">{body}</p>
        </Column>
      </Button>
    </Modal>
  );
}


export function getRelativePath(incomingURL) {
  try {
    const { pathname, hash } = new URL(incomingURL);
    if (pathname === '/' && hash)
      return hash.substring(1);
    else
      return pathname;
  } catch (error) {
    rollbar.error(error);
    return incomingURL;
  }
}


async function playNotificationSound() {
  const audioFile = 'audio/badoop.mp3';

  // navigator.notification.beep() doesn't work on iOS
  const isAndroid = (window.device && window.device.platform === 'Android');
  const isiOS     = (window.device && window.device.platform === 'iOS');

  if (isAndroid)
    window.navigator.notification.beep();
  else if (isiOS) {
    await new Promise((resolve, reject) => {
      const media = new window.Media(audioFile, resolve, reject);
      media.play();
    });
  } else if ('Audio' in window) {
    const audio = new window.Audio(`/${audioFile}`);
    try {
      await audio.play();
    } catch (error) {
      // Autoplay may not work before user interacts with the page.
      // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
    }
  }
}
