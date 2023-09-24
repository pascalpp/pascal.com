import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

inject({ mode: dev ? 'development' : 'production' });

export const prerender = true;
export const trailingSlash = 'always';

export const load = ({ url }) => {
  const { pathname } = url;

  return {
    pathname,
  };
};
