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
	const files = import.meta.glob('/src/routes/diary/**/*.md');
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

	return posts;
}

export async function fetchPost(slug: string): Promise<Post> {
	const post = (await import(`../../diary/${slug}/page.md`)) as Post;
	return post;
}
