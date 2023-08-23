import type { DateTime } from 'luxon';

export const getNextCollection = (
	ref: DateTime,
	baseRecyclingPickupDateTime: DateTime
): PickupCollection => {
	let nextCollectionDate = ref.setZone(baseRecyclingPickupDateTime.zone).startOf('day');

	const yesterday = nextCollectionDate.minus({ days: 1 });

	const yesterdayIsSkippedCollectionDay = isSkippedCollectionDay(
		yesterday,
		baseRecyclingPickupDateTime
	);


	// seek forward to find the next collection day iff yesterday was not a skipped collection day
	if (!yesterdayIsSkippedCollectionDay) {
		while (nextCollectionDate.weekday !== baseRecyclingPickupDateTime.weekday) {
			nextCollectionDate = nextCollectionDate.plus({ days: 1 });
		}
	}

	// floor because adding a day (in case of skip) will cause diff to be non-integer
	const hasRecycling =
		Math.floor(nextCollectionDate.diff(baseRecyclingPickupDateTime, 'weeks').weeks) % 2 === 0;


	// if we've projected a collection day that should be skipped, do so
	if (isSkippedCollectionDay(nextCollectionDate, baseRecyclingPickupDateTime)) {
		nextCollectionDate = nextCollectionDate.plus({ days: 1 });
	}

	return {
		date: nextCollectionDate,
		hasRecycling
	};
};

const isThanksgiving = (date: DateTime) => {
	// Thanksgiving is the 4th Thursday of November
	const month = date.month,
		day = date.day;
	return month === 11 && day >= 22 && day <= 28 && date.weekday === 4;
};

const isChristmas = (date: DateTime) => {
	// Christmas is December 25th
	const month = date.month,
		day = date.day;
	return month === 12 && day === 25;
};

const isNewYears = (date: DateTime) => {
	// New Year's is January 1st
	const month = date.month,
		day = date.day;
	return month === 1 && day === 1;
};

const isSkippedCollectionDay = (date: DateTime, baseRecyclingPickupDateTime: DateTime) => {
	return (
		(isThanksgiving(date) || isChristmas(date) || isNewYears(date)) &&
		date.weekday === baseRecyclingPickupDateTime.weekday
	);
};
