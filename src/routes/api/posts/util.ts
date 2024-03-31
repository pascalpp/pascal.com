import { dev } from '$app/environment';
import type { SvelteComponent } from 'svelte';

export type PostStatus = 'draft' | 'published';

export type PostMetadata = {
  title: string;
  date: string;
  status: PostStatus;
  tags?: string[];
  summary?: string;
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
