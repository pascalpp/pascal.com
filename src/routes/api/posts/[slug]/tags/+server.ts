import { dev } from '$app/environment';
import FS from 'fs';
import Path from 'path';

export async function PATCH({ params, request }) {
  if (!dev) {
    throw new Error('Not found');
  }

  const body = await request.json();
  const { tags } = body;

  const resolvedPath = Path.resolve(process.cwd(), `src/lib/diary/${params.slug}/page.md`);
  const file = FS.readFileSync(resolvedPath, 'utf8');
  const lines = file.split('\n');

  const frontmatter = lines.slice(0, lines.lastIndexOf('---')).filter((line) => !line.startsWith('tags:'));
  const updatedFrontmatter = [...frontmatter, `tags: [${tags.join(', ')}]`, '---'];
  const content = lines.slice(lines.lastIndexOf('---') + 1);
  const updatedFile = [...updatedFrontmatter, ...content].join('\n');

  try {
    FS.writeFileSync(resolvedPath, updatedFile, 'utf8');
    return Response.json('OK', { headers: { 'content-type': 'application/json; charset=utf-8' } });
  } catch (error) {
    console.error(error);
  }
}
