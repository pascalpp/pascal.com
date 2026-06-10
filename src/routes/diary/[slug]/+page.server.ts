import { unwrapArchivedComments } from './archivedComments.server';
import type { PageServerLoad } from './$types';
import type { PostMetadata } from '../../api/posts/util';

const archivedCommentFiles = import.meta.glob('/src/lib/diary/**/comments.md', {
  query: '?raw',
  import: 'default',
});
const postFiles = import.meta.glob('/src/lib/diary/**/page.md');

type PostModule = {
  metadata: PostMetadata;
};

const archivedCommentsHtmlBySlug = new Map<string, Promise<string>>();

function isFrontmatterTrue(value: boolean | string | undefined) {
  return typeof value === 'string' ? value.toLowerCase() === 'true' : value === true;
}

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

  if (!archivedCommentsLoader) {
    return {
      archivedCommentsHtml: undefined,
    };
  }

  const postLoader = postFiles[`/src/lib/diary/${params.slug}/page.md`] as (() => Promise<PostModule>) | undefined;
  const post = await postLoader?.();
  const archivedCommentsHtml = isFrontmatterTrue(post?.metadata.archivedComments)
    ? await loadArchivedCommentsHtml(params.slug, archivedCommentsLoader)
    : undefined;

  return {
    archivedCommentsHtml,
  };
};
