import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';
import { getRefFromURL } from '$lib/util';
import { getNextCollection } from '$lib/nextCollection';
import { baseRecyclingPickupDateTime } from '$lib/constants';

export const load = (({ url }) => {
	let ref;
	try {
		ref = getRefFromURL(url);
	} catch (e) {
		if (e instanceof Error) {
			throw error(400, { message: e.message });
		}
		throw error(400, { message: 'An unexpected error occurred' });
	}

	const nextCollection = getNextCollection(ref, baseRecyclingPickupDateTime);

	return {
		ref,
		nextCollectionDate: nextCollection.date,
		nextCollectionHasRecycling: nextCollection.hasRecycling
	};
}) satisfies PageLoad;
