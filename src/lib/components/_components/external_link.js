import Button                 from './button';
import ExternalLinkCircleIcon from '../assets/icons/external_link_circle.svg';
import React                  from 'react';

export default function ExternalLink({ href, label }) {
  return (
    <Button link external className="external-link" iconRight={<ExternalLinkCircleIcon/>} {...{ href, label }}/>
  );
}
