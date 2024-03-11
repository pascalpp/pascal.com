// src/routes/diary/+page.js
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, params }) => {
  const { tag } = params;
  if (!tag) error(404, 'no tag found');

  const response = await fetch(`/api/posts/tag/${tag}`);
  const posts = await response.json();

  return {
    posts,
    tag,
  };
};
