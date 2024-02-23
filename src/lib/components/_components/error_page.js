import './error_page.less';

import * as ENV         from '../util/env';
import bail             from '../util/bail';
import Button           from './button';
import ErrorPageDetails from './error_page_details';
import ErrorStar        from '../assets/images/error_star.svg';
import React            from 'react';
import rollbar          from '../rollbar';

import { ChevronLeft }  from 'react-feather';
import { RotateCcw }    from 'react-feather';

const isProduction = ENV.isProduction();


export default function ErrorPage({ logo, error, location, previousPage }) {
  const [ rollbarID, setRollbarID ] = React.useState(null);

  React.useEffect(function reportErrorToRollbarOnce() {
    const errorKey    = error.message.substring(0, 100);
    const wasReported = window.localStorage.getItem(errorKey);
    if (isProduction && !wasReported) {
      window.localStorage.setItem(errorKey, 'true');
      rollbar.error(error, (rollbarError, rollbarData) => {
        setRollbarID(rollbarData?.result?.uuid);
      });
    }
  }, [ error ]);

  return (
    <div className="error-page">
      <div className="error-content">
        {logo}
        <ErrorStar className="error-star"/>
        <h1 className="error-title">Sorry, an error has occurred.</h1>
        <h2 className="error-subtitle">Broadly has been notified of the error, and we will address it as soon as possible.</h2>

        <Button.Row center className="error-actions">
          {previousPage && <Button primary className="back" label="Go back" href={previousPage} iconLeft={<ChevronLeft/>}/>}
          <Button primary danger label="Restart" onClick={bail} iconLeft={<RotateCcw/>}/>
        </Button.Row>
      </div>

      {error && (
        <ErrorPageDetails {...{
          message: error.message,
          stack:   error.stack,
          location,
          rollbarID,
        }}/>
      )}
    </div>
  );
}
