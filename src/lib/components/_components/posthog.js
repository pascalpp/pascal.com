import * as Business       from '../business';
import * as ENV            from '../util/env';
import * as User           from '../user';
import { Fragment }        from 'react';
import { PostHogProvider } from 'posthog-js/react';
import { usePostHog }      from 'posthog-js/react';
import posthog             from 'posthog-js';
import React               from 'react';
import useRouteParams      from '../hooks/use_route_params';


const isProduction = ENV.isProduction();
const isPuppeteer  = ENV.isPuppeteer();

// https://posthog.com/docs/libraries/react
// https://posthog.com/docs/libraries/js
// https://vendasta.jira.com/wiki/spaces/RD/pages/1591083125/Recipes#Setup-(10-seconds)

const apiKey      = 'phc_ymSleJ1M3XziRDXuEtVZSiJTaISCxW30SFfOjCHuI8Y';
const apiHost     = 'https://pa.apigateway.co';
const projectUUID = isProduction ? '68eb78bc-1dc1-4c31-b113-638beb35f611' : '67d405e9-f648-45d3-80f1-63a59c3851d3';
const projectName = 'Broadly';
const environment = isProduction ? 'production' : 'demo';


export default function PostHog({ children }) {
  const instantiatePostHog = !isPuppeteer;

  if (instantiatePostHog)
    return <PostHogInstance>{children}</PostHogInstance>;
  else
    return <Fragment>{children}</Fragment>;
}

function PostHogInstance({ children }) {
  const isSalesforce          = User.useIsSalesforce();
  const [ client, setClient ] = React.useState(null);

  React.useEffect(function initializePostHog() {
    // don't initialize PostHog if user is salesforce impersonation, or if
    // already initialized

    if (!isSalesforce && !client) {
      posthog.init(
        apiKey,
        {
          api_host:         apiHost,
          opt_in_site_apps: false,
          loaded:           instance => {
            instance.register({
              environment,
              projectName,
              projectID: projectUUID,
            });
            setClient(instance);
          },
        },
        projectName,
      );
    }
  }, [ isSalesforce, client ]);

  if (client) {
    return (
      <PostHogProvider client={client}>
        <IdentifyPostHog/>
        {children}
      </PostHogProvider>
    );
  } else
    return <Fragment>{children}</Fragment>;
}


function IdentifyPostHog() {
  const ph             = usePostHog();
  const { businessID } = useRouteParams();
  const business       = Business.useBusiness(businessID);
  const profile        = User.useProfile();

  React.useEffect(function identifyPostHog() {
    if (ph && business && profile) {
      ph.identify(profile.userID, {
        email:        profile.email,
        name:         profile.name,
        businessID:   business.id,
        businessName: business.name,
        salesforceID: business.salesforceID,
      });
    }

    // clear PostHog and re-identify anytime business or profile changes
    return () => {
      if (ph)
        ph.reset();
    };
  }, [ business, profile, ph ]);

  return null;
}
