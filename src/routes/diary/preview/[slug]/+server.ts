import { dev } from '$app/environment';
import { ImageResponse } from '@vercel/og';
import juice from 'juice';
import { html } from 'satori-html';
import { fetchPost } from '../../../api/posts/util';
import PreviewImage from '../_PreviewImage.svelte';
import { dateFormatter, imageSize, type PreviewContent } from '../_layout';
import type { RequestHandler } from './$types';

type SsrComponent<Props> = {
  render(props: Props): {
    html: string;
    css: {
      code: string;
    };
  };
};

const PreviewImageSsr = PreviewImage as unknown as SsrComponent<{ content: PreviewContent }>;

async function loadFont(fetch: typeof globalThis.fetch, path: string): Promise<ArrayBuffer> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Unable to load font: ${path}`);
  }

  return response.arrayBuffer();
}

export const GET: RequestHandler = async ({ fetch, params }) => {
  try {
    const { metadata } = await fetchPost(params.slug);

    if (!dev && metadata.status === 'draft') {
      return new Response('Not found', { status: 404 });
    }

    const title = metadata.title;
    const summary = metadata.summary ?? 'A post from Pascal’s Diary.';
    const date = dateFormatter.format(new Date(metadata.date));
    const postUrl = `pascal.com/diary/${params.slug}`;
    const { html: markup, css } = PreviewImageSsr.render({
      content: {
        title,
        summary,
        date,
        url: postUrl,
      },
    });
    const inlinedMarkup = juice.inlineContent(markup, css.code, {
      removeStyleTags: true,
    });
    const [notoSansRegular, notoSansMedium] = await Promise.all([
      loadFont(fetch, '/fonts/NotoSans-Light.ttf'),
      loadFont(fetch, '/fonts/NotoSans-Regular.ttf'),
      loadFont(fetch, '/fonts/NotoSans-SemiBold.ttf'),
    ]);

    return new ImageResponse(html(inlinedMarkup), {
      ...imageSize,
      fonts: [
        {
          name: 'Noto Sans',
          data: notoSansRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Noto Sans',
          data: notoSansMedium,
          weight: 500,
          style: 'normal',
        },
        ],
        headers: {
          'cache-control': dev ? 'no-store' : 'public, max-age=31536000, immutable',
          'content-type': 'image/png',
          'x-content-type-options': 'nosniff',
        },
    });
  } catch (error) {
    return new Response('Not found', { status: 404 });
  }
};
