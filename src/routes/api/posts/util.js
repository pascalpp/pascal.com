export async function fetchAllPosts() {
	const files = await import.meta.glob('/src/routes/diary/**/*.md');
	const iterableFiles = Object.entries(files);

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
