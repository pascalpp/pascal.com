import PullToRefresh       from './pull_to_refresh';
import React               from 'react';
import ResourceNotFound    from './resource_not_found';
import ResourceUnavailable from './resource_unavailable';


export default function LoadFromServer({ swr, children, className, style }) {
  const { data, error, mutate } = swr;
  const isLoading               = !data && !error;
  const isNotFound              = error?.statusCode === 404;
  const isUnknownError          = !!(error && !isNotFound);

  if (isNotFound)
    return <ResourceNotFound/>;
  else if (isUnknownError)
    return <ResourceUnavailable/>;
  else {
    return (
      <PullToRefresh className={className} style={style} onRefresh={mutate}>
        {children({ data, isLoading })}
      </PullToRefresh>
    );
  }
}
