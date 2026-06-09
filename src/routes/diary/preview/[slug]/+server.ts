import { dev } from '$app/environment';
import { Resvg } from '@resvg/resvg-js';
import { mkdir, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import Path from 'path';
import { fetchPost } from '../../../api/posts/util';
import type { RequestHandler } from './$types';
import template from './template.svg?raw';

const width = 1200;
const fontUrls = [
  '/misc/slides/lib/font/source-sans-pro/source-sans-pro-regular.ttf',
  '/misc/slides/lib/font/source-sans-pro/source-sans-pro-semibold.ttf',
];
const fontProbeFamilies = [
  'sans-serif',
  'serif',
  'monospace',
  'Arial',
  'Helvetica',
  'Georgia',
  'Times New Roman',
  'DejaVu Sans',
  'DejaVu Serif',
  'Liberation Sans',
  'Liberation Serif',
  'Noto Sans',
  'Noto Serif',
  'Source Sans Pro',
];
const fontDirectory = Path.join(tmpdir(), 'pascal-diary-preview-fonts');
const fontPaths = [
  Path.join(fontDirectory, 'source-sans-pro-regular.ttf'),
  Path.join(fontDirectory, 'source-sans-pro-semibold.ttf'),
];
const localFontPaths = [
  Path.resolve(
    process.cwd(),
    'static/misc/slides/lib/font/source-sans-pro/source-sans-pro-regular.ttf',
  ),
  Path.resolve(
    process.cwd(),
    'static/misc/slides/lib/font/source-sans-pro/source-sans-pro-semibold.ttf',
  ),
];
let fontFilesPromise: Promise<string[]> | undefined;

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function wrapText(text: string, maxLineLength: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length > maxLineLength && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }

    if (lines.length === maxLines) break;
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:!?]*$/, '')}...`;
  }

  return lines;
}

function titleTspans(lines: string[]): string {
  return lines
    .map((line, index) => {
      const position = index === 0 ? 'y="0"' : 'dy="78"';
      return `<tspan x="0" ${position}>${escapeHtml(line)}</tspan>`;
    })
    .join('');
}

function renderTemplate(values: Record<string, string>): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (match, key: string) => values[key] ?? match);
}

function renderFontProbeSvg(): string {
  const rows = fontProbeFamilies
    .map((family, index) => {
      const x = index < 7 ? 72 : 620;
      const y = 76 + (index % 7) * 74;
      return `
        <text x="${x}" y="${y}" fill="#151515" font-family="${escapeHtml(family)}" font-size="30">
          ${escapeHtml(family)}: The quick brown fox jumps 123
        </text>
      `;
    })
    .join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#f1eee6"/>
      <text x="72" y="42" fill="#151515" font-family="sans-serif" font-size="24" font-weight="700">
        Vercel font probe
      </text>
      ${rows}
    </svg>
  `;
}

async function fetchFontBuffer(
  path: string,
  origin: string,
  fallbackFetch: typeof globalThis.fetch,
): Promise<Uint8Array> {
  const absoluteUrl = new URL(path, origin);
  let response = await globalThis.fetch(absoluteUrl);

  if (!response.ok) {
    response = await fallbackFetch(path);
  }

  if (!response.ok) {
    throw new Error(`Unable to load preview font: ${path}`);
  }

  const buffer = new Uint8Array(await response.arrayBuffer());
  if (buffer.byteLength < 100_000) {
    throw new Error(`Preview font response was unexpectedly small: ${path}`);
  }

  return buffer;
}

async function fetchFontBuffers(
  origin: string,
  fallbackFetch: typeof globalThis.fetch,
): Promise<Uint8Array[]> {
  return Promise.all(
    fontUrls.map(fontUrl => fetchFontBuffer(fontUrl, origin, fallbackFetch)),
  );
}

async function ensureFontFiles(
  origin: string,
  fallbackFetch: typeof globalThis.fetch,
): Promise<string[]> {
  fontFilesPromise ??= (async () => {
    const fontBuffers = await fetchFontBuffers(origin, fallbackFetch);
    await mkdir(fontDirectory, { recursive: true });
    await Promise.all(fontBuffers.map((font, index) => writeFile(fontPaths[index], font)));
    return fontPaths;
  })();

  return fontFilesPromise;
}

export const GET: RequestHandler = async ({ fetch, params, url }) => {
  try {
    if (url.searchParams.get('probe') === 'fonts') {
      const renderer = new Resvg(renderFontProbeSvg(), {
        fitTo: {
          mode: 'width',
          value: width,
        },
        font: {
          loadSystemFonts: true,
        },
        textRendering: 1,
      });
      const png = renderer.render().asPng();

      return new Response(new Uint8Array(png), {
        headers: {
          'cache-control': 'no-store',
          'content-type': 'image/png',
          'x-content-type-options': 'nosniff',
        },
      });
    }

    const { metadata } = await fetchPost(params.slug);

    if (!dev && metadata.status === 'draft') {
      return new Response('Not found', { status: 404 });
    }

    const titleLines = wrapText(metadata.title, 23, 2);
    const summaryLines = wrapText(metadata.summary ?? 'A post from Pascal’s Diary.', 56, 2);
    const date = dateFormatter.format(new Date(metadata.date));

    const svg = renderTemplate({
      title: escapeHtml(metadata.title),
      date: escapeHtml(date),
      url: escapeHtml(`pascal.com/diary/${params.slug}`),
      titleLines: titleTspans(titleLines),
      summaryLine1: escapeHtml(summaryLines[0] ?? ''),
      summaryLine2: escapeHtml(summaryLines[1] ?? ''),
    });

    const renderer = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: width,
      },
      font: {
        loadSystemFonts: false,
        fontFiles: dev ? localFontPaths : await ensureFontFiles(url.origin, fetch),
        defaultFontFamily: 'Source Sans Pro',
      },
      textRendering: 1,
    });
    const png = renderer.render().asPng();

    return new Response(new Uint8Array(png), {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
        'content-type': 'image/png',
        'x-content-type-options': 'nosniff',
      },
    });
  } catch (error) {
    return new Response('Not found', { status: 404 });
  }
};
