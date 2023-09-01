// src/routes/diary/[slug]/+page.js

import type { PostSummary } from '../../api/posts/util';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const response = await fetch(`/api/posts`);
	const posts = (await response.json()) as PostSummary[];

	const { slug } = params;
	const post = await import(`../${slug}/page.md`);
	const { metadata } = post;
	const { title, date } = metadata;
	const content = post.default;

	const index = posts.findIndex((item) => item.slug === slug);
	const next = posts[index + 1];
	const prev = posts[index - 1];

	return {
		next,
		prev,
		post: {
			slug,
			title,
			date,
			content,
			metadata,
		},
	};
};
