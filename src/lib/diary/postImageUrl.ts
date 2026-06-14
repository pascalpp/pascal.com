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

export async function resolvePostImageUrl(slug: string, image?: string) {
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
