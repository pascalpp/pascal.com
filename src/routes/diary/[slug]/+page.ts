// src/routes/diary/[slug]/+page.js
export async function load({ params }) {
	const post = await import(`../${params.slug}/page.md`);
	const { title, date } = post.metadata;
	const Content = post.default;

	return {
		title,
		date,
		Content,
	};
}
