import './resource_error.less';

import Button                   from '../components/button';
import React                    from 'react';
import ResourceUnavailableImage from '../assets/images/resource-unavailable.svg';


export default function ResourceUnavailable({ handleRetry }) {
  return (
    <div className="resource-error">
      <ResourceUnavailableImage className="resource-unavailable__image"/>
      <h2>Uh, oh. You might want to try&nbsp;again.</h2>
      <div className="resource-error__cta">
        <Button.Row center>
          <Button primary label="Try again" onClick={handleRetry}/>
        </Button.Row>
      </div>
    </div>
  );
}
