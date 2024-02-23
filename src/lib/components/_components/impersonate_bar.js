import './impersonate_bar.less';

import * as Auth       from '../auth';
import * as Business   from '../business';
import * as User       from '../user';
import FetchFromServer from './fetch_from_server';
import React           from 'react';
import Row             from './row';
import Select          from './select';
import useRouteParams  from '../hooks/use_route_params';


export default function ImpersonateBar() {
  const { businessID } = useRouteParams();
  const isSalesforce   = User.useIsSalesforce();
  const profile        = User.useProfile();

  return (
    <>
      {isSalesforce && businessID && <BusinessBar {...{ businessID, profile }}/>}
      {isSalesforce && !businessID && <NonBusinessBar {...{ profile }}/>}
    </>
  );
}

function BusinessBar({ businessID, profile }) {
  const users    = Business.useUsers(businessID);
  const statuses = Business.useBusinessStatuses(businessID);
  const load     = Business.useLoadBusiness(businessID);

  return (
    <div className="app-banner">
      <div className="impersonate-bar">
        <FetchFromServer statuses={statuses} load={load} pullToRefresh={false}>
          <Row spread>
            {profile?.name && <div className="signed-in-as">Signed in as: {profile.name}</div>}
            {users && <SignInAs selected={profile?.userID ?? ''} users={users}/>}
          </Row>
        </FetchFromServer>
      </div>
    </div>
  );
}

function NonBusinessBar({ profile }) {
  return (
    <div className="app-banner">
      <div className="impersonate-bar">
        <Row spread>
          <div className="signed-in-as">Signed in as: {profile.name}</div>
        </Row>
      </div>
    </div>
  );
}


function SignInAs({ users, selected }) {
  const options = users.map(user => ({ value: user.id, label: user.name }));
  return (
    <Row spread>
      <label>Sign in as:</label>
      <Select onChange={handleChange} value={selected} options={options}>
        <option value="">Broadly Support</option>
      </Select>
    </Row>
  );
}


function handleChange(event) {
  event.preventDefault();
  const userID = event.target.value || null;
  Auth.authenticateWithSalesforce({ userID });
}
