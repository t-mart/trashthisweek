import { Temporal } from "temporal-polyfill";

// Plugerville's time zone
export const timeZone = "America/Chicago";

export function dateInPflugerville() {
  return Temporal.Now.plainDateISO(timeZone);
}

// Day of week for collection
// "with Monday being 1, and Sunday 7."
const collectionDayOfWeek = 3; // Wednesday

const recyclingReferenceDate = Temporal.PlainDate.from({
  year: 2025,
  month: 1,
  day: 15,
});

// this will actually never be a collection day in my community, but just for
// completeness according to policy:
// https://www.pflugervilletx.gov/791/Trash-Pickup-Schedule
function isThanksgiving(date: Temporal.PlainDate) {
  // Thanksgiving is the fourth Thursday in November
  const month = date.month,
    day = date.day;
  return month === 11 && day >= 22 && day <= 28 && date.dayOfWeek === 4;
}

const christmas = Temporal.PlainMonthDay.from({ month: 12, day: 25 });
function isChristmas(date: Temporal.PlainDate) {
  return date.toPlainMonthDay().equals(christmas);
}

const newYears = Temporal.PlainMonthDay.from({ month: 1, day: 1 });
function isNewYears(date: Temporal.PlainDate) {
  return date.toPlainMonthDay().equals(newYears);
}

function isHoliday(date: Temporal.PlainDate) {
  return isThanksgiving(date) || isChristmas(date) || isNewYears(date);
}

export type Collection = {
  date: Temporal.PlainDate;
  withRecycling: boolean;
};

function collectionHasRecycling(date: Temporal.PlainDate) {
  // safety check for me
  if (date.dayOfWeek !== collectionDayOfWeek) {
    throw new RangeError("date should be a collection day");
  }

  const diff = recyclingReferenceDate.until(date);

  // this was a bug. the `total` call below would error if the duration was
  // blank/zero. (this itself might be a bug in the temporal polyfill? see
  // https://github.com/fullcalendar/temporal-polyfill/issues/55)
  if (diff.blank) {
    return true;
  }

  const diffWeeks = diff.total({
    unit: "week",
    relativeTo: date,
  });

  return diffWeeks % 2 === 0;
}

export function getNextCollection(query: Temporal.PlainDate): Collection {
  const yesterday = query.add({ days: -1 });
  if (isHoliday(yesterday) && yesterday.dayOfWeek === collectionDayOfWeek) {
    return {
      date: query,
      withRecycling: collectionHasRecycling(yesterday),
    };
  }

  // positive modulo formula
  const daysUntil = (((collectionDayOfWeek - query.dayOfWeek) % 7) + 7) % 7;
  let nextCollectionDay = query.add({ days: daysUntil });

  // determine recycling now (an integral number of weeks), before possibly
  // bumping from holiday
  const withRecycling = collectionHasRecycling(nextCollectionDay);

  // bump if needed
  if (isHoliday(nextCollectionDay)) {
    nextCollectionDay = nextCollectionDay.add({ days: 1 });
  }

  return {
    date: nextCollectionDay,
    withRecycling,
  };
}
