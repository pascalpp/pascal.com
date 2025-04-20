import { dev } from '$app/environment';
import { exec } from 'child_process';
import Path from 'path';

export async function POST({ params }) {
  if (!dev) {
    throw new Error('Not found');
  }

  const resolvedPath = Path.resolve(process.cwd(), `src/lib/diary/${params.slug}/page.md`);
  try {
    exec(`cursor ${resolvedPath}`);
    return Response.json('OK', { headers: { 'content-type': 'application/json; charset=utf-8' } });
  } catch (error) {
    console.error(error);
  }
}
