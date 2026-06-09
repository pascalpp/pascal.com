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
const fontPaths = {
  crimsonProLight: '/fonts/CrimsonPro-Light.woff',
  crimsonProMedium: '/fonts/CrimsonPro-Medium.woff',
  interRegular: '/fonts/Inter-Regular.woff',
  interMedium: '/fonts/Inter-Medium.woff',
  interSemiBold: '/fonts/Inter-SemiBold.woff',
};
const localFontData = dev
  ? {
      crimsonProLight: readFont('CrimsonPro-Light.woff'),
      crimsonProMedium: readFont('CrimsonPro-Medium.woff'),
      interRegular: readFont('Inter-Regular.woff'),
      interMedium: readFont('Inter-Medium.woff'),
      interSemiBold: readFont('Inter-SemiBold.woff'),
    }
  : undefined;
const remoteFontData = new Map<string, Promise<ArrayBuffer>>();

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

async function fetchFont(fetch: typeof globalThis.fetch, path: string): Promise<ArrayBuffer> {
  const cached = remoteFontData.get(path);

  if (cached) {
    return cached;
  }

  const font = fetch(path).then(response => {
    if (!response.ok) {
      throw new Error(`Unable to load font ${path}: ${response.status}`);
    }

    return response.arrayBuffer();
  });

  remoteFontData.set(path, font);

  return font;
}

function loadFonts(fetch: typeof globalThis.fetch): Promise<ArrayBuffer[]> {
  if (localFontData) {
    return Promise.all([
      localFontData.crimsonProLight,
      localFontData.crimsonProMedium,
      localFontData.interRegular,
      localFontData.interMedium,
      localFontData.interSemiBold,
    ]);
  }

  return Promise.all([
    fetchFont(fetch, fontPaths.crimsonProLight),
    fetchFont(fetch, fontPaths.crimsonProMedium),
    fetchFont(fetch, fontPaths.interRegular),
    fetchFont(fetch, fontPaths.interMedium),
    fetchFont(fetch, fontPaths.interSemiBold),
  ]);
}

export const GET: RequestHandler = async ({ fetch, params }) => {
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
    const [crimsonProLight, crimsonProMedium, interRegular, interMedium, interSemiBold] = await loadFonts(fetch);
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
          name: 'Crimson Pro',
          data: crimsonProLight,
          weight: 200,
          style: 'normal',
        },
        {
          name: 'Crimson Pro',
          data: crimsonProMedium,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interMedium,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interSemiBold,
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
    console.error(`[diary preview:${params.slug}]`, error);

    return new Response('Not found', { status: 404 });
  }
};
