import { dev } from '$app/environment';
import FS from 'fs';
import Path from 'path';

export async function PATCH({ params }) {
	if (!dev) {
		throw new Error('Not found');
	}

	const resolvedPath = Path.resolve(process.cwd(), `src/routes/diary/${params.slug}/page.md`);
	const file = FS.readFileSync(resolvedPath, 'utf8');
	const lines = file.split('\n');

	const frontmatter = lines.slice(0, lines.lastIndexOf('---'));
	const content = lines.slice(lines.lastIndexOf('---') + 1);

	const isDraft = frontmatter.some((line) => line.includes('status: draft'));
	const newStatus = isDraft ? 'published' : 'draft';
	const updatedFrontmatter = [...frontmatter.filter(excludeStatus), `status: ${newStatus}`, '---'];
	const updatedFile = [...updatedFrontmatter, ...content].join('\n');

	try {
		FS.writeFileSync(resolvedPath, updatedFile, 'utf8');
		return Response.json('OK', { headers: { 'content-type': 'application/json; charset=utf-8' } });
	} catch (error) {
		console.error(error);
	}
}

function excludeStatus(line: string) {
	return !line.startsWith('status:');
}
