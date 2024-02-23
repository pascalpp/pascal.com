import React          from 'react';
import useRouteParams from '../hooks/use_route_params';

export default function withMainRouteParams(Component) {
  return function ComponentWithRouteParams(props) {
    const params = useRouteParams();
    return <Component {...props} {...params}/>;
  };
}
