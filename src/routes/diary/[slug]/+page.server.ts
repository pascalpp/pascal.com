import { unwrapArchivedComments } from './archivedComments.server';
import type { PageServerLoad } from './$types';

const archivedCommentFiles = import.meta.glob('/src/lib/diary/**/comments.md', {
  query: '?raw',
  import: 'default',
});

const archivedCommentsHtmlBySlug = new Map<string, Promise<string>>();

function loadArchivedCommentsHtml(slug: string, loader: () => Promise<string>) {
  let archivedCommentsHtml = archivedCommentsHtmlBySlug.get(slug);

  if (!archivedCommentsHtml) {
    archivedCommentsHtml = loader()
      .then((rawComments) => unwrapArchivedComments(rawComments))
      .catch((error) => {
        archivedCommentsHtmlBySlug.delete(slug);
        throw error;
      });
    archivedCommentsHtmlBySlug.set(slug, archivedCommentsHtml);
  }

  return archivedCommentsHtml;
}

export const load: PageServerLoad = async ({ params }) => {
  const archivedCommentsLoader = archivedCommentFiles[`/src/lib/diary/${params.slug}/comments.md`] as
    | (() => Promise<string>)
    | undefined;
  const archivedCommentsHtml = archivedCommentsLoader
    ? await loadArchivedCommentsHtml(params.slug, archivedCommentsLoader)
    : undefined;

  return {
    archivedCommentsHtml,
  };
};
