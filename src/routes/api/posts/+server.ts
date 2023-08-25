import { fetchAllPosts } from './util';

export const GET = async () => {
	const posts = await fetchAllPosts();

	const sorted = posts.sort((a, b) => {
		if (b.slug > a.slug) return -1;
		if (b.slug < a.slug) return 1;
		return 0;
	});

	return Response.json(sorted, { headers: { 'content-type': 'application/json; charset=utf-8' } });
};
