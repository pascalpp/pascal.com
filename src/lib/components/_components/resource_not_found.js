import './resource_error.less';

import Button                from '../components/button';
import React                 from 'react';
import ResourceNotFoundImage from '../assets/images/resource-not-found.svg';
import useRouteParams        from '../hooks/use_route_params';


export default function ResourceNotFound({ action = 'See all contacts', tab = 'contacts' }) {
  const { businessID } = useRouteParams();
  const href           = businessID ? `/${businessID}/${tab}` : '/';

  return (
    <div className="resource-error">
      <ResourceNotFoundImage className="resource-not-found__image"/>
      <h2>Oops, this page doesn’t exist.</h2>
      <div className="resource-error__cta">
        <Button.Row center>
          <Button primary label={action} href={href}/>
        </Button.Row>
      </div>
    </div>
  );
}
