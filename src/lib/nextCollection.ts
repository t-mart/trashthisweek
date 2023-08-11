import type { DateTime } from 'luxon';

export const getNextCollection = (ref: DateTime, baseRecyclingPickupDateTime: DateTime) => {
	let nextCollectionDate = ref.setZone(baseRecyclingPickupDateTime.zone).startOf('day');
	while (nextCollectionDate.weekday !== baseRecyclingPickupDateTime.weekday) {
		nextCollectionDate = nextCollectionDate.plus({ days: 1 });
	}
    nextCollectionDate = nextCollectionDate.startOf('day');

    const weekDiff = baseRecyclingPickupDateTime.diff(nextCollectionDate, 'weeks').weeks;
    const hasRecycling = weekDiff % 2 === 0;

	return {
		date: nextCollectionDate,
		hasRecycling
	};
};
