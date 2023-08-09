import { DateTime } from 'luxon';

import { timeZone, refParameter } from './constants';

export const getRefFromURL = (url: URL) => {
	const urlNow = url.searchParams.get(refParameter);
	if (urlNow) {
		const now = DateTime.fromISO(urlNow, { zone: timeZone });
		if (now.invalidReason)
			throw new Error(
				`Invalid ${refParameter} parameter: ${urlNow}, ${now.invalidReason}, ${now.invalidExplanation}`
			);
	}
	const now = urlNow
		? DateTime.fromISO(urlNow, { zone: timeZone })
		: DateTime.now().setZone(timeZone);
	return now;
};

export const getDayOfMonthOrdinalSuffix = (n: number) => {
	const s = ['th', 'st', 'nd', 'rd'],
		v = n % 100;
	return s[(v - 20) % 10] || s[v] || s[0];
};
