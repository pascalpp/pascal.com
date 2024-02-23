import './suspend.less';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense }      from 'react';
import React             from 'react';
import SpokeSpinner      from '../components/spoke_spinner';


export default function Suspend({
  children,
  loading = <SpokeSpinner fill/>,
  errorMessage = 'An error occurred.',
  error = () => <DefaultErrorComponent message={errorMessage}/>,
}) {
  return (
    <Suspense fallback={loading}>
      <ErrorBoundary FallbackComponent={error}>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
}


function DefaultErrorComponent({ message }) {
  return (
    <div className="suspend-error">
      {message}
    </div>
  );
}
