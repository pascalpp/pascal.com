// https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#add-an-rss-feed
// https://www.davidwparker.com/posts/how-to-make-an-rss-feed-in-sveltekit
// https://scottspence.com/posts/make-an-rss-feed-with-sveltekit

import pretty from 'pretty';
import { fetchAllPosts } from '../../api/posts/util';
import type { PostSummary } from '../../api/posts/util';

export const prerender = true;

export const GET = async () => {
  const posts = await fetchAllPosts();
  const publishedPosts = posts.filter((post) => post.metadata.status !== 'draft');
  const sortedPosts = publishedPosts.sort(sortPosts);

  const body = render(sortedPosts);
  const options = {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
    },
  };

  return new Response(body, options);
};

function sortPosts(a: PostSummary, b: PostSummary, multiplier = 1) {
  if (b.metadata.date < a.metadata.date) return -1 * multiplier;
  if (b.metadata.date > a.metadata.date) return 1 * multiplier;
  return 0;
}

const baseURL = 'https://www.pascal.com/diary';
const title = 'Pascal’s Diary';
const description = 'Diary of a guy who does some things';

function render(posts: PostSummary[]) {
  return pretty(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${title}</title>
        <description>${description}</description>
        <link>${baseURL}</link>
        <atom:link href="${baseURL}/rss" rel="self" type="application/rss+xml"/>
        ${posts.map(renderPost).join('')}
      </channel>
    </rss>`
  );
}

function renderPost(post: PostSummary) {
  const tags = post.metadata.tags?.map((tag) => `<category>${tag}</category>`).join('') ?? '';
  const tagDescription = `Tags: ${post.metadata.tags?.join(', ') ?? 'none'}`;
  const summary = post.metadata.summary ?? tagDescription;
  return `<item>
    <guid isPermaLink="true">${baseURL}/${post.slug}</guid>
    <title>${post.metadata.title}</title>
    <link>${baseURL}/${post.slug}</link>${tags}
    <description>${summary}</description>
    <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
    </item>`;
}
