import './not_found_page.less';

import Button           from './button';
import Column           from './column';
import ErrorPageDetails from './error_page_details';
import NotFoundImage    from '../assets/images/resource-not-found.svg';
import React            from 'react';

import { RotateCcw }    from 'react-feather';


export default function NotFoundPage({ title = 'Oops, page not found.', showPageInfo = false }) {
  return (
    <Column center className="not-found-page">
      <Column center className="not-found-message">
        <Column center className="image-and-title">
          <NotFoundImage className="not-found-image"/>
          <h2 className="not-found-title">{title}</h2>
        </Column>

        <p>
          <Button primary label="Restart" href="/" iconLeft={<RotateCcw/>}/>
        </p>
      </Column>

      {showPageInfo && (
        <ErrorPageDetails {...{
          message:  window.location.href,
          location: window.location,
        }}/>
      )}
    </Column>
  );
}
