export const imageSize = {
  width: 1200,
  height: 630,
};

// bump this version whenever the preview image layout changes to bust the cache
// for old preview images
export const imageVersion = '2026-06-09-1';

export type PreviewContent = {
  title: string;
  summary: string;
  date: string;
  url: string;
};

export const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
