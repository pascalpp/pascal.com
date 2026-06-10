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
