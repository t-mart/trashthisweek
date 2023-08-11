import { describe, test, expect } from 'vitest';
import { DateTime } from 'luxon';

import { getNextCollection } from '$lib/nextCollection';
import { baseRecyclingPickupDateTime } from '$lib/constants';

const product = <T extends unknown[][]>(...a: T) =>
	a.reduce<unknown[][]>((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())), [[]]);

describe('getNextCollection', () => {
	// Just do fuzz testing (test that no error) because there are so many
	// dimensions.
	product(
		// year
		[
			'2023', // non-leap year
			'2024' // leap year
		],
		// date
		[
			'2024-01-01', // standard time
			'2024-07-01', // daylight time
		],
		// zone
		[
			'America/New_York', // forward zone
			'America/Chicago', // same zone
			'America/Denver' // backward zone
		],
		// day offset
		[
			-1, // day before
			0, // same day
			1 // day after
		],
		// time of day
		[
			'00:00:00.000', // start of day
			'23:59:59.999' // end of day
		]
	).forEach((args) => {
		const [year, date, zone, dayOffset, timeOfDay] = args;
		const refDate = DateTime.fromISO(`${year}-${date}T${timeOfDay}`, { zone: String(zone) }).plus({
			days: Number(dayOffset)
		});

		test(`${args}`, () => {
			const nextCollection = getNextCollection(refDate, baseRecyclingPickupDateTime);
			expect(nextCollection).toBeTruthy();
		});
	});
});
