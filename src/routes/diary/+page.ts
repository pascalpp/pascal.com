import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch('/api/posts/all');
  const posts = await response.json();

  return {
    posts,
  };
};
