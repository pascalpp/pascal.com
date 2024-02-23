import './error_page_details.less';

import * as Env        from '../util/env';
import * as UI         from '../ui';
import AlertCard       from './alert_card';
import buildInfo       from '../app/build_info';
import Button          from './button';
import copyToClipboard from '../util/copy_to_clipboard';
import React           from 'react';

const isProduction = Env.isProduction();


export default function ErrorPageDetails({ message, stack, location, rollbarID }) {
  const { version, build } = buildInfo;

  function copy() {
    try {
      const { userAgent } = window.navigator;
      const details       = { message, location, stack, userAgent, rollbarID, build, version };
      const content       = JSON.stringify(details, null, 2);
      copyToClipboard(content);
      UI.toast('Copied to clipboard!');
    } catch (e) {
      UI.toast('Clipboard not available. 😭');
    }
  }

  return (
    <div className="error-page-details">
      <details open={!isProduction}>
        <summary>Details</summary>
        <AlertCard type="tip">
          {message && <h3 className="error-message">{message}</h3>}
          {stack && <Details title="Error stack" details={stack}/>}
          {location && <Details title="Location details" details={JSON.stringify(location, null, 2)}/>}
          {rollbarID && <p>Error ID: {rollbarID}</p>}
          {version && <p>Version: {version}</p>}
          {build && <p>Build: {build}</p>}
          <Button.Row right>
            <Button tiny secondary label="Copy to clipboard" onClick={copy}/>
          </Button.Row>
        </AlertCard>
      </details>
    </div>
  );
}


function Details({ title, details }) {
  return (
    <details className="error-details">
      <summary>{title}</summary>
      {details}
    </details>
  );
}
