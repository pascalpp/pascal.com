export const imageSize = {
  width: 1200,
  height: 630,
};

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
