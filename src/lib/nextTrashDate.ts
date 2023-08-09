import type { DateTime } from 'luxon';

import { referenceRecyclingWeekDateTime, trashDayOfWeek } from './constants';

export const getNextTrashDate = (now: DateTime): App.TrashDate => {
	let nextTrashDate = now.startOf('day');
	while (nextTrashDate.weekday !== trashDayOfWeek) {
		nextTrashDate = nextTrashDate.plus({ days: 1 });
	}
    nextTrashDate = nextTrashDate.startOf('day');

    const weekDiff = referenceRecyclingWeekDateTime.diff(nextTrashDate, 'weeks').weeks;
    const isRecycling = weekDiff % 2 === 0;

	return {
		nextTrashDate,
		isRecycling
	};
};
