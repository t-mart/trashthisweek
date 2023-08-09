import { json } from '@sveltejs/kit';
import { getNowFromParam } from '$lib/util';
import { getNextTrashDate } from '$lib/nextTrashDate';

import type { RequestHandler } from './$types';

export const GET = (({ url }) => {
	let nextTrashDate;
	try {
		nextTrashDate = getNextTrashDate(getNowFromParam(url));
	} catch (e) {
		if (e instanceof Error) {
			return json({ error: e.message }, { status: 400 });
		}
		return json({ error: 'An unexpected error occurred' }, { status: 500 });
	}
	return json(nextTrashDate);
}) satisfies RequestHandler;
