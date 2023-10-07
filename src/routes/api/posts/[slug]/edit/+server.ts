import { dev } from '$app/environment';
import Path from 'path';
import { exec } from 'child_process';

export async function POST({ params }) {
  if (!dev) {
    throw new Error('Not found');
  }

  const resolvedPath = Path.resolve(process.cwd(), `src/routes/diary/${params.slug}/page.md`);
  try {
    exec(`code ${resolvedPath}`);
    return Response.json('OK', { headers: { 'content-type': 'application/json; charset=utf-8' } });
  } catch (error) {
    console.error(error);
  }
}
