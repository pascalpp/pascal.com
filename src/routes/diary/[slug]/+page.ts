import { type PostMetadata, type PostSummary } from '../../api/posts/util';
import type { PageLoad } from './$types';

const postAssetLoaders = import.meta.glob('/src/lib/diary/**/*.{avif,gif,jpeg,jpg,png,webp}', {
  query: '?url',
  import: 'default',
}) as Record<string, () => Promise<string>>;

const absoluteUrlPattern = /^[a-z][a-z\d+\-.]*:/i;

function splitUrlSuffix(url: string) {
  const suffixIndex = url.search(/[?#]/);

  if (suffixIndex === -1) {
    return { path: url, suffix: '' };
  }

  return {
    path: url.slice(0, suffixIndex),
    suffix: url.slice(suffixIndex),
  };
}

async function resolvePostImageUrl(slug: string, image?: string) {
  if (!image) return undefined;

  if (absoluteUrlPattern.test(image) || image.startsWith('//') || image.startsWith('/')) {
    return image;
  }

  const { path, suffix } = splitUrlSuffix(image);
  const assetPath = path.replace(/^\.\//, '');
  const assetLoader = postAssetLoaders[`/src/lib/diary/${slug}/${assetPath}`];
  const assetUrl = await assetLoader?.();

  return assetUrl ? `${assetUrl}${suffix}` : undefined;
}

export const load: PageLoad = async ({ data, fetch, params }) => {
  const response = await fetch(`/api/posts/all`);
  const posts = (await response.json()) as PostSummary[];

  const { slug } = params;
  const post = await import(`../../../lib/diary/${slug}/page.md`);
  const metadata = post.metadata as PostMetadata;
  const { title, date } = metadata;
  const PostComponent = post.default;

  const index = posts.findIndex(item => item.slug === slug);
  const current = posts[index];
  const next = posts[index + 1];
  const prev = posts[index - 1];

  return {
    next,
    prev,
    post: {
      ...current,
      slug,
      title,
      date,
      PostComponent,
      ogImageUrl: await resolvePostImageUrl(slug, metadata.ogimage),
      archivedCommentsHtml: data.archivedCommentsHtml,
      metadata,
    },
  };
};
