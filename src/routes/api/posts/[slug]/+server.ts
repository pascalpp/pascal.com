import { fetchPost } from '../util';

export const GET = async ({ params }) => {
	try {
		const post = await fetchPost(params.slug);
		return Response.json(post, { headers: { 'content-type': 'application/json; charset=utf-8' } });
	} catch (e) {
		const error = e as Error;
		return Response.json({ error: error.message }, { status: 404 });
	}
};
