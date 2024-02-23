import { useProfile } from '../user/hooks';
import Button         from '../components/button';
import loadScript     from '../util/load_script';
import React          from 'react';


export const chilipiperMeetings = {
  broadlyFree: 'Broadly_Free_Router',
  freeTrial:   'Self_Sign_Up_Inbound_Router',
};


export default function ContactUsButton({ onClick, meeting = chilipiperMeetings.broadlyFree, ...buttonProps }) {
  const profile = useProfile();

  async function startUpgrade() {
    const domain = 'broadly';

    // Not interested in useScript, we don't want to load
    // this script on every page load.
    if (!window.ChiliPiper?.submit)
      await loadScript('https://js.chilipiper.com/marketing.js');

    if (onClick)
      onClick();

    window.ChiliPiper.submit(domain, meeting, {
      lead: {
        FirstName: profile.name,
        LastName:  '',
        Email:     profile.email,
      },
    });
  }

  return <Button type="button" onClick={startUpgrade} data-meeting={meeting} {...buttonProps}/>;
}
