import { dev } from '$app/environment';
import type { SvelteComponent } from 'svelte';

type PostResolver = () => Promise<{ metadata: Record<string, string> }>;

export type PostSummary = {
	slug: string;
	path: string;
	metadata: Record<string, string>;
};

export type Post = {
	metadata: Record<string, string>;
	default: SvelteComponent;
};

export async function fetchAllPosts(): Promise<PostSummary[]> {
	const files = import.meta.glob('/src/routes/diary/**/page.md');
	const iterableFiles = Object.entries(files) as [string, PostResolver][];

	const posts = await Promise.all(
		iterableFiles.map(async ([path, post]) => {
			const { metadata } = await post();
			const slug = path.split('/').slice(-2)[0];
			return {
				slug,
				path,
				metadata,
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
	const post = (await import(`../../diary/${slug}/page.md`)) as Post;
	return post;
}

export async function fetchAllPostsByTag(tag: string): Promise<PostSummary[]> {
	const posts = await fetchAllPosts();
	const filteredPosts = posts.filter((post) => {
		return post.metadata.tags?.includes(tag);
	});
	return filteredPosts;
}
