// src/routes/diary/[slug]/+page.js

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await import(`../${params.slug}/page.md`);
	const { title, date } = post.metadata;
	const Content = post.default;

	return {
		title,
		date,
		Content,
	};
};
