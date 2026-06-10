import { unwrapArchivedComments } from './archivedComments.server';
import type { PageServerLoad } from './$types';

const archivedCommentFiles = import.meta.glob('/src/lib/diary/**/comments.md', {
  query: '?raw',
  import: 'default',
});

export const load: PageServerLoad = async ({ params }) => {
  const archivedCommentsLoader = archivedCommentFiles[`/src/lib/diary/${params.slug}/comments.md`] as
    | (() => Promise<string>)
    | undefined;
  const archivedCommentsHtml = archivedCommentsLoader
    ? unwrapArchivedComments(await archivedCommentsLoader())
    : undefined;

  return {
    archivedCommentsHtml,
  };
};
