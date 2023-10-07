import { dev } from '$app/environment';
import File from 'fs';
import Path from 'path';
import slugify from 'slugify';
import { exec } from 'child_process';

export async function POST({ request }) {
  if (!dev) {
    throw new Error('Not found');
  }

  const body = await request.json();
  const { title } = body;

  if (!title) throw new Error('No title provided');

  const date = new Date().toISOString();
  const slugdate = date.split('T')[0];
  const slugname = slugify(title).toLowerCase();
  const slug = `${slugdate}-${slugname}`;
  const output = ['---', `title: ${title}`, `date: ${date}`, `status: draft`, '---', '', ''].join('\n');

  const outputPath = Path.resolve(process.cwd(), `src/routes/diary/${slug}/page.md`);
  try {
    File.mkdirSync(Path.dirname(outputPath), { recursive: true });
    File.writeFileSync(outputPath, output, 'utf8');
    exec(`code ${outputPath}`);
    return Response.json(
      { slug, path: outputPath },
      { headers: { 'content-type': 'application/json; charset=utf-8' } }
    );
  } catch (error) {
    console.error(error);
  }
}
