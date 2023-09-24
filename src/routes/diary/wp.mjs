import File from 'fs';
import Path from 'path';
import posts from './wp.json' assert { type: 'json' };
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { marked } from 'marked';

const nhm = new NodeHtmlMarkdown(
  /* options (optional) */ {},
  /* customTransformers (optional) */ undefined,
  /* customCodeBlockTranslators (optional) */ undefined
);

function writePost(post) {
  const wp_id = post.wp_id;
  const title = nhm.translate(marked.parse(post.post_title));
  const timestamp = post.post_date.replace(' ', 'T') + '.000Z';
  const slugdate = post.post_date.split(' ')[0];
  const slugname = post.post_name;
  const slug = `${slugdate}-${slugname}`;
  const frontmatter = ['---', `title: ${title}`, `date: ${timestamp}`, `wordpress_id: ${wp_id}`, '---'].join('\n');

  const html = marked.parse(post.post_content);
  const content = nhm.translate(html);
  const output = `${frontmatter}\n\n${content}\n\n\n`;

  console.log(slug);
  console.log(output);
  const outputPath = `./${slug}/page.md`;
  File.mkdirSync(Path.dirname(outputPath), { recursive: true });
  File.writeFileSync(outputPath, output);
}

posts.filter((post) => post.post_type === 'post').forEach(writePost);
