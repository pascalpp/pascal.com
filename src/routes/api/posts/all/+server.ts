import { fetchAllPosts } from '../util';

export async function GET() {
	const posts = await fetchAllPosts();

	return Response.json(posts, { headers: { 'content-type': 'application/json; charset=utf-8' } });
}
