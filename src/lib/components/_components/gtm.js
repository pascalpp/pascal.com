import * as Business  from '../business';
import * as ENV       from '../util/env';
import React          from 'react';
import TagManager     from 'react-gtm-module';
import useRouteParams from '../hooks/use_route_params';


const tagManagerArgs = {
  gtmId: 'GTM-NNSBK5P',
};

const useGTM = !ENV.isPuppeteer();


export default function GTM() {
  if (useGTM)
    return <InitializeGTM/>;
  else
    return null;
}


function InitializeGTM() {
  const { businessID } = useRouteParams();
  const business       = Business.useBusiness(businessID);

  React.useEffect(function() {
    TagManager.initialize(tagManagerArgs);
  }, []);

  if (business)
    return <BusinessDataLayerArguments {...{ business }}/>;
  else
    return null;
}


function BusinessDataLayerArguments({ business }) {
  const { isPremium } = business;

  React.useEffect(function() {
    addToDataLayer({
      dataLayer: { isPremium },
    });
  }, [ isPremium ]);

  return null;
}


export function addToDataLayer(args) {
  if (useGTM)
    TagManager.dataLayer(args);
}
