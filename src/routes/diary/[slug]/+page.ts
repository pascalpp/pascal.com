import { type PostSummary } from '../../api/posts/util';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(`/api/posts/all`);
  const posts = (await response.json()) as PostSummary[];

  const { slug } = params;
  const post = await import(`../../../lib/diary/${slug}/page.md`);
  const { metadata } = post;
  const { title, date } = metadata;
  const content = post.default;

  const index = posts.findIndex((item) => item.slug === slug);
  const current = posts[index];
  const next = posts[index + 1];
  const prev = posts[index - 1];

  return {
    next,
    prev,
    post: {
      ...current,
      slug,
      title,
      date,
      content,
      metadata,
    },
  };
};
