import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';

import { getRefFromURL } from '$lib/util';
import { getNextCollection } from '$lib/nextCollection';
import { baseRecyclingPickupDateTime } from '$lib/constants';

export const GET = (({ url }) => {
	let nextTrashDate;
	try {
		nextTrashDate = getNextCollection(getRefFromURL(url), baseRecyclingPickupDateTime);
	} catch (e) {
		if (e instanceof Error) {
			return json({ error: e.message }, { status: 400 });
		}
		return json({ error: 'An unexpected error occurred' }, { status: 500 });
	}
	return json(nextTrashDate);
}) satisfies RequestHandler;
