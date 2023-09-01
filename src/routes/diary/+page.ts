// src/routes/diary/+page.js
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const tag = url.searchParams.get('tag');

	let apiUrl;

	if (tag) {
		apiUrl = `/api/posts?tag=${tag}`;
	} else {
		apiUrl = `/api/posts`;
	}

	const response = await fetch(apiUrl);
	const posts = await response.json();

	return {
		posts,
		tag,
	};
};
