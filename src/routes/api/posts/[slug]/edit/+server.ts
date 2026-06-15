import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import Path from 'path';
import { openInEditor } from '../../editor.server';

export async function POST({ params }) {
  if (!dev) {
    throw new Error('Not found');
  }

  const resolvedPath = Path.resolve(process.cwd(), `src/lib/diary/${params.slug}/page.md`);
  try {
    await openInEditor([resolvedPath]);
    return json('OK');
  } catch (error) {
    console.error(error);
    return json({ error: error instanceof Error ? error.message : 'Unable to open post' }, { status: 500 });
  }
}
