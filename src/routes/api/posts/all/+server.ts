import { fetchAllPosts } from '../util';

export async function GET() {
  const posts = await fetchAllPosts();

  const sorted = posts.slice().sort((a, b) => {
    if (b.metadata.date < a.metadata.date) return 1;
    if (b.metadata.date > a.metadata.date) return -1;
    return 0;
  });

  return Response.json(sorted, { headers: { 'content-type': 'application/json; charset=utf-8' } });
}
