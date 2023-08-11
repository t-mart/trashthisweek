import { DateTime } from 'luxon';

import { refParameter, baseRecyclingPickupDateTime } from './constants';

export const getRefFromURL = (url: URL) => {
	const urlRef = url.searchParams.get(refParameter);
	let ref;
	if (urlRef) {
		ref = DateTime.fromISO(urlRef, { zone: baseRecyclingPickupDateTime.zone });
		if (ref.invalidReason)
			throw new Error(
				`Invalid ${refParameter} parameter: ${urlRef}, ${ref.invalidReason}, ${ref.invalidExplanation}`
			);
	} else {
		ref = DateTime.now().setZone(baseRecyclingPickupDateTime.zone);
	}
	return ref;
};

export const getDayOfMonthOrdinalSuffix = (n: number) => {
	const s = ['th', 'st', 'nd', 'rd'],
		v = n % 100;
	return s[(v - 20) % 10] || s[v] || s[0];
};
