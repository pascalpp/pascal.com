import './page_error_boundary.less';

import { ErrorBoundary }   from 'react-error-boundary';
import { getPreviousPage } from '../hooks/use_navigation';
import ErrorPage           from './error_page';
import Navbar              from '../components/navbar';
import React               from 'react';
import useRouter           from '../hooks/use_router';


export default function PageErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={PageErrorComponent}>
      {children}
    </ErrorBoundary>
  );
}


function PageErrorComponent({ error }) {
  const router       = useRouter();
  const { location } = window;

  const previousPage = router && getPreviousPage(router);

  return (
    <>
      <Navbar title="Error" showMenuButton={true} showBackButton={false}/>
      <div className="page-content page-error-boundary">
        <ErrorPage {...{ error, location, previousPage }}/>
      </div>
    </>
  );
}
