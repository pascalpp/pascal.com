import './puppeteer.less';

import React from 'react';


export default function PuppeteerStyles() {
  React.useEffect(function addPuppeteerClassname() {
    document.documentElement.classList.add('puppeteer');
  }, []);

  return null;
}
