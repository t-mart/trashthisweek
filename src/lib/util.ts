import { DateTime } from 'luxon';

import { timeZone } from './constants';

export const getNowFromParam = (url: URL) => {
	const urlNow = url.searchParams.get('now');
	if (urlNow) {
		const now = DateTime.fromISO(urlNow, { zone: timeZone });
		if (now.invalidReason)
			throw new Error(
				`Invalid now parameter: ${urlNow}, ${now.invalidReason}, ${now.invalidExplanation}`
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
