import type { DateTime } from 'luxon';

import { referenceRecyclingWeekDateTime, trashDayOfWeek } from './constants';

export const getNextCollection = (ref: DateTime) => {
	let nextCollectionDate = ref.startOf('day');
	while (nextCollectionDate.weekday !== trashDayOfWeek) {
		nextCollectionDate = nextCollectionDate.plus({ days: 1 });
	}
    nextCollectionDate = nextCollectionDate.startOf('day');

    const weekDiff = referenceRecyclingWeekDateTime.diff(nextCollectionDate, 'weeks').weeks;
    const hasRecycling = weekDiff % 2 === 0;

	return {
		date: nextCollectionDate,
		hasRecycling
	};
};
