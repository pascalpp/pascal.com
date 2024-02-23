import './app_error_boundary.less';

import { ErrorBoundary } from 'react-error-boundary';
import BroadlyLogo       from '../assets/broadly_logo.svg';
import ErrorPage         from './error_page';
import React             from 'react';


export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={AppErrorComponent}>
      {children}
    </ErrorBoundary>
  );
}


function AppErrorComponent({ error }) {
  const { location } = window;

  return (
    <div className="page app-error-boundary">
      <ErrorPage logo={<BroadlyLogo/>} {...{ error, location }}/>
    </div>
  );
}
