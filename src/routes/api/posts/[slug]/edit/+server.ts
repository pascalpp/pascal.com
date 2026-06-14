import { dev } from '$app/environment';
import Path from 'path';
import { openInEditor } from '../../editor.server';

export async function POST({ params }) {
  if (!dev) {
    throw new Error('Not found');
  }

  const resolvedPath = Path.resolve(process.cwd(), `src/lib/diary/${params.slug}/page.md`);
  try {
    openInEditor([resolvedPath]);
    return Response.json('OK', { headers: { 'content-type': 'application/json; charset=utf-8' } });
  } catch (error) {
    console.error(error);
  }
}
