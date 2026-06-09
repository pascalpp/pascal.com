import { dev } from '$app/environment';
import { ImageResponse } from '@vercel/og';
import { readFile } from 'fs/promises';
import juice from 'juice';
import { resolve } from 'path';
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
const fontDirectory = resolve(process.cwd(), 'static/fonts');
const fontData = {
  notoSansLight: readFont('NotoSans-Light.ttf'),
  notoSansRegular: readFont('NotoSans-Regular.ttf'),
  notoSansMedium: readFont('NotoSans-Medium.ttf'),
  notoSansSemiBold: readFont('NotoSans-SemiBold.ttf'),
};

function mark(slug: string, label: string, start: number): number {
  const now = performance.now();

  if (dev) {
    console.log(`[diary preview:${slug}] ${label}: ${(now - start).toFixed(1)}ms`);
  }

  return now;
}

async function readFont(filename: string): Promise<ArrayBuffer> {
  const font = await readFile(resolve(fontDirectory, filename));
  const bytes = new Uint8Array(font);

  return bytes.buffer;
}

export const GET: RequestHandler = async ({ params }) => {
  try {
    const totalStart = performance.now();
    let timer = totalStart;
    const { metadata } = await fetchPost(params.slug);
    timer = mark(params.slug, 'fetch post', timer);

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
    timer = mark(params.slug, 'render svelte', timer);
    const inlinedMarkup = juice.inlineContent(markup, css.code, {
      removeStyleTags: true,
    });
    timer = mark(params.slug, 'inline css', timer);
    const [notoSansLight, notoSansRegular, notoSansMedium, notoSansSemiBold] = await Promise.all([
      fontData.notoSansLight,
      fontData.notoSansRegular,
      fontData.notoSansMedium,
      fontData.notoSansSemiBold,
    ]);
    timer = mark(params.slug, 'load fonts', timer);
    const headers = {
      'cache-control': dev ? 'no-store' : 'public, max-age=31536000, immutable',
      'content-type': 'image/png',
      'x-content-type-options': 'nosniff',
    };

    const imageResponse = new ImageResponse(html(inlinedMarkup), {
      ...imageSize,
      fonts: [
        {
          name: 'Noto Sans',
          data: notoSansLight,
          weight: 300,
          style: 'normal',
        },
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
        {
          name: 'Noto Sans',
          data: notoSansSemiBold,
          weight: 600,
          style: 'normal',
        },
      ],
      headers,
    });

    timer = mark(params.slug, 'create image response', timer);

    if (dev) {
      const image = await imageResponse.arrayBuffer();
      mark(params.slug, 'render png', timer);
      mark(params.slug, 'total', totalStart);

      return new Response(image, { headers });
    }

    return imageResponse;
  } catch (error) {
    return new Response('Not found', { status: 404 });
  }
};
