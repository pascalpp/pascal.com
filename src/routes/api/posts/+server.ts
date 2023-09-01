import { fetchAllPosts, fetchAllPostsByTag } from './util';

export async function GET({ url }) {
	let posts = [];

	const tag = url.searchParams.get('tag');

	if (tag) {
		posts = await fetchAllPostsByTag(tag);
	} else {
		posts = await fetchAllPosts();
	}

	return Response.json(posts, { headers: { 'content-type': 'application/json; charset=utf-8' } });
}
