import * as Business  from '../business';
import useRouteParams from '../hooks/use_route_params';


export default function HasFeature({ feature, children }) {
  const { businessID } = useRouteParams();
  const hasFeature     = Business.useHasFeature(businessID, feature);

  if (hasFeature)
    return children || null;
  else
    return null;
}
