import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';
import { getNowFromParam } from '$lib/util';
import { getNextTrashDate } from '$lib/nextTrashDate';

export const load = (({ url }) => {
	let now;
	try {
		now = getNowFromParam(url);
	} catch (e) {
		if (e instanceof Error) {
			throw error(400, { message: e.message });
		}
		throw error(400, { message: 'An unexpected error occurred' });
	}

	const nextTrashDate = getNextTrashDate(now);

	return {
		now,
		nextTrashDate: nextTrashDate.nextTrashDate,
        isRecycling: nextTrashDate.isRecycling,
	};
}) satisfies PageLoad;
