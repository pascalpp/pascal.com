import { dev } from '$app/environment';
import FS from 'fs';
import Path from 'path';
import type { SvelteComponent } from 'svelte';

export type PostStatus = 'draft' | 'published';

export type PostMetadata = {
  title: string;
  date: Date;
  status?: PostStatus;
  tags?: string[];
  summary?: string;
  updated?: Date;
};

export type PostFrontMatter = {
  title: string;
  date: string;
  status?: string;
  tags?: string;
  summary?: string;
  updated?: string;
};

export type PostSummary = {
  slug: string;
  path: string;
  metadata: PostMetadata;
};

export type Post = {
  metadata: PostMetadata;
  default: SvelteComponent;
};

export type PostContent = {
  metadata: PostMetadata;
  content: string;
};

type PostResolver = () => Promise<{ metadata: PostMetadata }>;

export async function fetchAllPosts(): Promise<PostSummary[]> {
  const files = import.meta.glob('/src/lib/diary/**/page.md');
  const iterableFiles = Object.entries(files) as [string, PostResolver][];

  const posts = await Promise.all(
    iterableFiles.map(async ([path, post]) => {
      const { metadata } = await post();
      const slug = path.split('/').slice(-2)[0];
      return {
        slug,
        path,
        metadata: metadata as PostMetadata,
      };
    })
  );

  if (dev) {
    return posts;
  } else {
    return posts.filter((post) => post.metadata.status !== 'draft');
  }
}

export async function fetchPost(slug: string): Promise<Post> {
  const post = (await import(`../../../lib/diary/${slug}/page.md`)) as Post;
  return post;
}

export async function fetchAllPostsByTag(tag: string): Promise<PostSummary[]> {
  const posts = await fetchAllPosts();
  const filteredPosts = posts.filter((post) => {
    return post.metadata.tags?.includes(tag);
  });
  return filteredPosts;
}

export async function readPost(slug: string): Promise<string> {
  const resolvedPath = Path.resolve(process.cwd(), `src/lib/diary/${slug}/page.md`);
  const file = FS.readFileSync(resolvedPath, 'utf8');
  return file;
}

export function getFrontMatterLines(content: string): string[] {
  const trimmed = content.trim();
  if (!trimmed.startsWith('---')) {
    throw new Error('Invalid frontmatter');
  }
  const [, frontmatterText] = trimmed.split('---');
  return frontmatterText.trim().split('\n');
}

export function parseFrontMatterLines(lines: string[]): PostMetadata {
  const record = lines.reduce((acc, line) => {
    const [key, value] = line.split(': ').map((item) => item.trim());
    return {
      ...acc,
      [key]: value,
    };
  }, {} as PostFrontMatter);

  const metadata: PostMetadata = {
    title: record.title,
    date: new Date(record.date),
    status: record.status as PostStatus,
    tags: record.tags
      ?.substring(1, record.tags?.length - 1)
      .split(',')
      .map((tag) => tag.trim()),
    summary: record.summary,
    updated: record.updated ? new Date(record.updated) : undefined,
  };

  return metadata;
}
