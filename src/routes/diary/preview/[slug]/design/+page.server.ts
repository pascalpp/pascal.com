import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { fetchPost } from '../../../../api/posts/util';
import { dateFormatter } from '../../_layout';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ params, url }) => {
  try {
    const { metadata } = await fetchPost(params.slug);

    if (!dev && metadata.status === 'draft') {
      error(404, 'Not found');
    }

    return {
      compare: url.searchParams.has('compare'),
      imageUrl: url.searchParams.has('compare')
        ? `/diary/preview/${params.slug}?v=${Date.now()}`
        : `/diary/preview/${params.slug}`,
      content: {
        title: metadata.title,
        summary: metadata.summary ?? 'A post from Pascal’s Diary.',
        date: dateFormatter.format(new Date(metadata.date)),
        url: `pascal.com/diary/${params.slug}`,
      },
    };
  } catch {
    error(404, 'Not found');
  }
};
