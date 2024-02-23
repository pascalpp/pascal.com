import './page.less';

import { Suspense }       from 'react';
import { useIsSplitView } from '../hooks/use_media_query';
import classnames         from 'classnames';
import EmptyPage          from '../components/empty_page';
import NotFoundPage       from '../components/not_found_page';
import PageErrorBoundary  from '../components/page_error_boundary';
import React              from 'react';
import SpokeSpinner       from '../components/spoke_spinner';
import store              from '../store';

// renderPage: route adapter for rendering page components
//
// - provides router to each page
// - provides route to each page
// - provides routeName to each page (used to highlight the active tab link)
// - provides route params to each page
// - renders lazy-loaded pages inside suspense
// - applies routeProps.className to the page, if provided
// - prevents access to page if routeProps.allow is provided and returns false
//
// F7 provides f7router/f7route as props to the component for each route. But we
// also need access to the router/route in tab components, which aren't rendered
// directly by F7. Tab components are rendered by MainView/RouteTab, which gets
// the router/route from AppContext and then passes them in. So this adapter
// accepts either f7router/f7route or router/route props, and passes them along
// as router/route.
//
// One critical thing to note: F7 doesn't like when div.page is rendered inside
// Suspense. So div.page needs to be the outermost wrapper in order for the
// initial view and router initialization to complete properly.

export default function renderPage(PageComponent, { tabPage } = {}) {
  return function RenderPage({
    f7router,
    f7route,
    router = f7router,
    route = f7route,
    routeProps = route.route,
    ...props
  }) {
    // in single view, we render the tab page like a regular page, so that the
    // page transitions work like any other page. but when the browser is wide
    // enough for split view, we render the tab page in the tab-panel, and
    // render an empty page to the right of it. The tabPage option in each
    // top-level route enables this behavior.
    const isSplitView     = useIsSplitView();
    const renderEmptyPage = tabPage && isSplitView;
    const Component       = renderEmptyPage ? EmptyPage : PageComponent;
    const className       = renderEmptyPage ? 'empty-page' : routeProps?.className;

    return (
      <Page {...{ Component, className, router, route, routeProps, ...props }}/>
    );
  };
}


function Page({ Component, className, router, route, routeProps, ...props }) {
  const classNames = classnames('page', className);
  const routeName  = route.name;
  const restricted = accessRestricted(routeProps?.allow, props.businessID);

  return (
    <div className={classNames}>
      <Suspense fallback={<SpokeSpinner fill/>}>
        <PageErrorBoundary>
          {restricted && <NotFoundPage title={routeProps.disallowedTitle}/>}
          {!restricted && <Component {...{ router, route, routeName }} {...props}/>}
        </PageErrorBoundary>
      </Suspense>
    </div>
  );
}

function accessRestricted(allow, businessID) {
  return allow && !allow(store.getState(), businessID);
}
