import { describe, test, expect } from 'vitest';
import { DateTime } from 'luxon';

import { getNextCollection } from '$lib/nextCollection';

// A known date that is a pickup date and has recycling. At time of writing, this is the actual base
// recycling pickup date that's used in the app, but we don't want to couple to that.
const BASE_RECYCLING_PICKUP_DATE_TIME = DateTime.fromISO('2023-08-02T00:00:00', {
	zone: 'America/Chicago'
});

expect.extend({
	toMatchCollectionPickup(received: PickupCollection, expected: PickupCollection) {
		const { isNot, equals } = this;
		return {
			pass:
				equals(received.hasRecycling, expected.hasRecycling) && received.date.equals(expected.date),
			message: () => `expected ${received} ${isNot ? 'not ' : ''}to match ${expected}`,
			actual: received,
			expected
		};
	}
});

describe('getNextCollection', () => {
	test('day before, recycling', () => {
		const ref = BASE_RECYCLING_PICKUP_DATE_TIME.minus({ days: 1 });
		const baseRecyclingPickupDateTime = BASE_RECYCLING_PICKUP_DATE_TIME;
		expect(getNextCollection(ref, baseRecyclingPickupDateTime)).toMatchCollectionPickup({
			date: BASE_RECYCLING_PICKUP_DATE_TIME,
			hasRecycling: true
		});
	});

	test('day of, recycling', () => {
		const ref = BASE_RECYCLING_PICKUP_DATE_TIME;
		const baseRecyclingPickupDateTime = BASE_RECYCLING_PICKUP_DATE_TIME;
		expect(getNextCollection(ref, baseRecyclingPickupDateTime)).toMatchCollectionPickup({
			date: BASE_RECYCLING_PICKUP_DATE_TIME,
			hasRecycling: true
		});
	});

	test('day before, no recycling', () => {
		const ref = BASE_RECYCLING_PICKUP_DATE_TIME.minus({ days: 1 });
		const baseRecyclingPickupDateTime = BASE_RECYCLING_PICKUP_DATE_TIME.plus({ weeks: 1 });
		expect(getNextCollection(ref, baseRecyclingPickupDateTime)).toMatchCollectionPickup({
			date: BASE_RECYCLING_PICKUP_DATE_TIME,
			hasRecycling: false
		});
	});

	test('day of, no recycling', () => {
		const ref = BASE_RECYCLING_PICKUP_DATE_TIME;
		const baseRecyclingPickupDateTime = BASE_RECYCLING_PICKUP_DATE_TIME.plus({ weeks: 1 });
		expect(getNextCollection(ref, baseRecyclingPickupDateTime)).toMatchCollectionPickup({
			date: BASE_RECYCLING_PICKUP_DATE_TIME,
			hasRecycling: false
		});
	});

	test('skips Thanksgiving', () => {
		// artificially say that the base pickup day is Thursday, the only day on which Thanksgiving can fall
		const baseRecyclingPickupDateTime = DateTime.fromISO('2023-11-23T00:00:00.000', {
			zone: 'America/Chicago'
		});
		const ref = baseRecyclingPickupDateTime.minus({ days: 1 });
		const nextCollection = getNextCollection(ref, baseRecyclingPickupDateTime);
		expect(nextCollection.date.toISODate()).toBe('2023-11-24');
	});

	test('skips Christmas', () => {
		// in 2024, with a standard wednesday pickup, Christmas is on a Wednesday, which should be skipped
		const ref = DateTime.fromISO('2024-12-23T00:00:00.000', {
			zone: 'America/Chicago'
		});
		const baseRecyclingPickupDateTime = BASE_RECYCLING_PICKUP_DATE_TIME;
		const nextCollection = getNextCollection(ref, BASE_RECYCLING_PICKUP_DATE_TIME);
		expect(nextCollection.date.toISODate()).toBe('2024-12-26');
	});

	test("skips New Year's", () => {
		// in 2024, with a standard wednesday pickup, New Year's is on a Wednesday, which should be skipped
		const ref = DateTime.fromISO('2024-12-29T00:00:00.000', {
			zone: 'America/Chicago'
		});
		const baseRecyclingPickupDateTime = BASE_RECYCLING_PICKUP_DATE_TIME;
		const nextCollection = getNextCollection(ref, BASE_RECYCLING_PICKUP_DATE_TIME);
		expect(nextCollection.date.toISODate()).toBe('2025-01-02');
	});
});
