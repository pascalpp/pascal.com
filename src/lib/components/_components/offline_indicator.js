// We're going to detect when the device goes offline, and show a message at
// the bottom of the page.
//
// To try it out, in Chrome DevTools enter responsive mode, and look for the
// network toggle, it should read "Online", change it to "Offline".
import './offline_indicator.less';

import React      from 'react';
import useBoolean from '../hooks/use_boolean';


export default function OfflineIndicator() {
  const [ isOffline, setOffline, setOnline ] = useBoolean(false);

  React.useEffect(function registerListeners() {
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);

    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    };
  }, [ setOffline, setOnline ]);

  if (isOffline) {
    return (
      <div className="app-banner">
        <div className="offline-indicator">
          <span>No network connection</span>
        </div>
      </div>
    );
  } else
    return null;
}
