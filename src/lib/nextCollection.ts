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
// completeness according to our collector's policy
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

function withRecycling(date: Temporal.PlainDate) {
  if (date.equals(recyclingReferenceDate)) {
    return true;
  }

  const diff = date.until(recyclingReferenceDate, {
    smallestUnit: "week",
    largestUnit: "week",
    roundingMode: "expand", // round away from zero
  });
  const diffWeeks = diff.total({
    unit: "week",
    relativeTo: recyclingReferenceDate,
  });

  return diffWeeks % 2 === 0;
}

export function getNextCollection(query?: Temporal.PlainDate): Collection {
  query = query ?? dateInPflugerville();

  const yesterday = query.add({ days: -1 });
  if (isHoliday(yesterday) && yesterday.dayOfWeek === collectionDayOfWeek) {
    return {
      date: query,
      withRecycling: withRecycling(yesterday),
    };
  }

  let nextCollectionDay = query;
  for (let daysOffset = 0; daysOffset < 7; daysOffset++) {
    if (nextCollectionDay.dayOfWeek === collectionDayOfWeek) {
      break;
    }
    nextCollectionDay = nextCollectionDay.add({ days: 1 });
  }

  // crazy, but just in case
  if (nextCollectionDay.dayOfWeek !== collectionDayOfWeek) {
    throw new Error("Could not find next collection day");
  }

  // bump to next day if it's a holiday
  if (isHoliday(nextCollectionDay)) {
    nextCollectionDay = nextCollectionDay.add({ days: 1 });
  }

  return {
    date: nextCollectionDay,
    withRecycling: withRecycling(nextCollectionDay),
  };
}
