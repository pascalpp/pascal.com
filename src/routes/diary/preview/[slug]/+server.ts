import { dev } from '$app/environment';
import { ImageResponse } from '@vercel/og';
import { fetchPost } from '../../../api/posts/util';
import type { RequestHandler } from './$types';

const imageSize = {
  width: 1200,
  height: 630,
};

const reactElement = Symbol.for('react.element');

function el(type: string, props: Record<string, unknown>, ...children: unknown[]) {
  return {
    $$typeof: reactElement,
    type,
    key: null,
    ref: null,
    props: {
      ...props,
      children,
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { metadata } = await fetchPost(params.slug);

    if (!dev && metadata.status === 'draft') {
      return new Response('Not found', { status: 404 });
    }

    const title = metadata.title;
    const summary = metadata.summary ?? 'A post from Pascal’s Diary.';
    const date = dateFormatter.format(new Date(metadata.date));
    const postUrl = `pascal.com/diary/${params.slug}`;

    return new ImageResponse(
      el(
        'div',
        {
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
            background: '#f1eee6',
            color: '#151515',
            fontFamily: 'Noto Sans',
          },
        },
        el('div', {
          style: {
            position: 'absolute',
            left: 36,
            top: 36,
            width: 1132,
            height: 557,
            display: 'flex',
            background: 'rgba(21, 21, 21, 0.075)',
            borderRadius: 24,
          },
        }),
        el('div', {
          style: {
            position: 'absolute',
            left: 36,
            top: 136,
            width: 1132,
            height: 330,
            display: 'flex',
            background: '#f1eee6',
          },
        }),
        el(
          'div',
          {
            style: {
              position: 'absolute',
              left: 72,
              top: 72,
              display: 'flex',
              fontSize: 36,
              fontWeight: 400,
              lineHeight: 1,
            },
          },
          date,
        ),
        el(
          'div',
          {
            style: {
              position: 'absolute',
              left: 70,
              top: 170,
              width: 1030,
              display: 'flex',
              flexDirection: 'column',
            },
          },
          el(
            'div',
            {
              style: {
                display: 'flex',
                fontSize: 78,
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: 0,
              },
            },
            title,
          ),
          el(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                marginTop: 28,
                marginLeft: 5,
                width: 920,
                color: 'rgba(21, 21, 21, 0.72)',
                fontSize: 36,
                fontWeight: 500,
                lineHeight: 1.28,
              },
            },
            summary,
          ),
        ),
        el(
          'div',
          {
            style: {
              position: 'absolute',
              left: 72,
              top: 500,
              display: 'flex',
              flexDirection: 'column',
              color: 'rgba(21, 21, 21, 0.72)',
            },
          },
          el(
            'div',
            {
              style: {
                display: 'flex',
                fontSize: 36,
                lineHeight: 1,
              },
            },
            'Pascal’s Diary',
          ),
          el(
            'div',
            {
              style: {
                display: 'flex',
                marginTop: 8,
                marginLeft: 2,
                fontSize: 24,
                fontWeight: 500,
                lineHeight: 1,
              },
            },
            postUrl,
          ),
        ),
        el('div', {
          style: {
            position: 'absolute',
            left: 36,
            top: 36,
            width: 1132,
            height: 557,
            display: 'flex',
            border: '2px dashed rgba(21, 21, 21, 0.3)',
            borderRadius: 24,
          },
        }),
      ),
      {
        ...imageSize,
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
          'content-type': 'image/png',
          'x-content-type-options': 'nosniff',
        },
      },
    );
  } catch (error) {
    return new Response('Not found', { status: 404 });
  }
};
