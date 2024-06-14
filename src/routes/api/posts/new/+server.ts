import { dev } from '$app/environment';
import { exec } from 'child_process';
import File from 'fs';
import Path from 'path';
import slugify from 'slugify';

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
  const metadata = ['---', `title: ${title}`, `date: ${date}`, `status: draft`, `summary:`, '---', '', ''].join('\n');

  const content = `
<script lang="ts">
  import Demo from './Demo.svelte';
</script>

<Demo/>
  `;

  const output = [metadata, content].join('\n');

  const demoOutput = `
<script lang="ts">
  export let name = 'world';
</script>

<div class="demo">
  Hello, {name}!
</div>

<style lang="less">
  .demo {
    display: flex;
  }
</style>
  `;

  const outputPath = Path.resolve(process.cwd(), `src/lib/diary/${slug}/page.md`);
  const demoOutputPath = Path.resolve(process.cwd(), `src/lib/diary/${slug}/Demo.svelte`);
  try {
    File.mkdirSync(Path.dirname(outputPath), { recursive: true });
    File.writeFileSync(outputPath, output, 'utf8');
    File.writeFileSync(demoOutputPath, demoOutput, 'utf8');
    exec(`code ${outputPath} ${demoOutputPath}`);
    return Response.json(
      { slug, path: outputPath },
      { headers: { 'content-type': 'application/json; charset=utf-8' } },
    );
  } catch (error) {
    console.error(error);
  }
}
