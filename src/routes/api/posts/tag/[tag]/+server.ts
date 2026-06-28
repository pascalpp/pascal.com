import { fetchAllPostsByTag } from '../../util';

export async function GET({ params }) {
	const posts = await fetchAllPostsByTag(params.tag);

	return Response.json(posts, { headers: { 'content-type': 'application/json; charset=utf-8' } });
}
