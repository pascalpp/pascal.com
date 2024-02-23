import './sms_illustration.less';

import { MessageSquare } from 'react-feather';
import React             from 'react';


export default function SmsIllustration() {
  return (
    <div className="sms-illustration">
      <MessageSquare/>
      <MessageSquare/>
    </div>
  );
}
