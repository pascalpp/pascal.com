type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
};

export const giscusConfig: GiscusConfig = {
  repo: 'pascalpp/pascal.com',
  repoId: 'R_kgDOKDSWSA',
  category: 'Diary Comments',
  categoryId: 'DIC_kwDOKDSWSM4C-1ci',
};

export const isGiscusConfigured =
  Boolean(giscusConfig.repo) &&
  Boolean(giscusConfig.repoId) &&
  Boolean(giscusConfig.category) &&
  Boolean(giscusConfig.categoryId);

export function unwrapArchivedComments(rawComments: string): string {
  return sanitizeArchivedComments(rawComments.replace(/<!--/g, '').replace(/-->/g, '').trim());
}

function sanitizeArchivedComments(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s+(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '')
    .replace(/\s+(href|src)\s*=\s*javascript:[^\s>]+/gi, '');
}
