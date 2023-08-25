// src/routes/diary/+layout.js
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const path = url.pathname;

	return {
		path,
	};
};
