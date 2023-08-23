import type { DateTime } from 'luxon';

export const getNextCollection = (
	ref: DateTime,
	baseRecyclingPickupDateTime: DateTime
): PickupCollection => {
	let nextCollectionDate = ref.setZone(baseRecyclingPickupDateTime.zone).startOf('day');
	while (nextCollectionDate.weekday !== baseRecyclingPickupDateTime.weekday) {
		nextCollectionDate = nextCollectionDate.plus({ days: 1 });
	}
	nextCollectionDate = nextCollectionDate.startOf('day');

	const weekDiff = baseRecyclingPickupDateTime.diff(nextCollectionDate, 'weeks').weeks;
	const hasRecycling = weekDiff % 2 === 0;

	if (
		isThanksgiving(nextCollectionDate) ||
		isChristmas(nextCollectionDate) ||
		isNewYears(nextCollectionDate)
	) {
		nextCollectionDate = nextCollectionDate.plus({ days: 1 });
	}

	return {
		date: nextCollectionDate,
		hasRecycling
	};
};

const isThanksgiving = (date: DateTime) => {
	const month = date.month,
		day = date.day;
	return month === 11 && day >= 22 && day <= 28 && date.weekday === 4;
};

const isChristmas = (date: DateTime) => {
	const month = date.month,
		day = date.day;
	return month === 12 && day === 25;
};

const isNewYears = (date: DateTime) => {
	const month = date.month,
		day = date.day;
	return month === 1 && day === 1;
};
