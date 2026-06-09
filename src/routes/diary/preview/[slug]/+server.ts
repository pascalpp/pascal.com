import { dev } from '$app/environment';
import { Resvg } from '@resvg/resvg-js';
import { fileURLToPath } from 'url';
import { fetchPost } from '../../../api/posts/util';
import type { RequestHandler } from './$types';
import template from './template.svg?raw';

const width = 1200;
const regularFontPath = fileURLToPath(new URL('./fonts/source-sans-pro-regular.ttf', import.meta.url));
const semiboldFontPath = fileURLToPath(new URL('./fonts/source-sans-pro-semibold.ttf', import.meta.url));

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

export const GET: RequestHandler = async ({ params }) => {
  try {
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
        fontFiles: [regularFontPath, semiboldFontPath],
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
