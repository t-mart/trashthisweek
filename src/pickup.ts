import {
  nextWednesday,
  differenceInWeeks,
  isWednesday,
  startOfDay,
  isSameDay,
  format,
  addDays,
  isSameWeek,
} from "date-fns";

interface Pickup {
  date: Date;
  isRecycling: boolean;
  relativeText: string;
}

/**
 * Reference date to determine the recycling-ness of other pickup dates.
 */
const KNOWN_RECYCLE_DATE = new Date("2022-08-03T00:00:00-0500");
/**
 * format string that produces strings like "August 3rd"
 */
const RELATIVE_FORMAT = "MMMM do";

function getNextPickupDate(fromDate: Date) {
  if (isWednesday(fromDate)) {
    return startOfDay(fromDate);
  }
  return startOfDay(nextWednesday(fromDate));
}

function getIsRecycling(date: Date) {
  return differenceInWeeks(KNOWN_RECYCLE_DATE, date) % 2 === 0;
}

/**
 * Describe toDate relative to fromDate in words.
 *
 * Note: this function is not generalized to all arbitrary dates. It only makes sense when
 *
 * - fromDate is earlier than toDate
 * - fromDate and toDate are in the same week or consecutive weeks
 *
 * Examples:
 * - "Today, August 3rd" if fromDate and toDate are the same day
 * - "Tomorrow, August 3rd" if fromDate + 1 day is the same day
 * - "This Wednesday, August 3rd" if fromDate is in the same week as toDate (week being the period
 *   that starts 00:00 Sunday and ends 23:59 Saturday)
 * - "Next Wednesay, August 3rd" in all other cases.
 *
 * The difference between "This Wednesday" and "Next Wednesday" follow an idiosyncrasy of English,
 * where the meaning of "this" and "next" change depending on the instant of time in which they are
 * used. See https://english.stackexchange.com/questions/3841/which-day-does-next-tuesday-refer-to
 * for more discussion.
 *
 * @param fromDate the reference date from which to describe toDate
 * @param toDate the date to describe
 * @returns text that describes toDate
 */
function getRelativeText(fromDate: Date, toDate: Date) {
  const formatted = format(toDate, RELATIVE_FORMAT);
  if (isSameDay(fromDate, toDate)) {
    return `Today, ${formatted}`;
  } else if (isSameDay(addDays(fromDate, 1), toDate)) {
    return `Tomorrow, ${formatted}`;
  } else if (isSameWeek(fromDate, toDate)) {
    return `This ${format(toDate, "EEEE")}, ${formatted}`;
  }
  return `Next ${format(toDate, "EEEE")}, ${formatted}`;
}

/**
 * Returns the next pickup date if its a recycling day, and a string of words that describe the next
 * day. If today is a pickup day, return that instead.
 *
 * This function hardcodes:
 * - trash pickups to be on Wednesdays
 * - recycling pickups to be only every other Wednesday with 2022-08-03T00:00:00-0500 as a reference
 *   recycling pickup day.
 *
 * @param fromDate The date of which to find the next pickup
 * @returns A Pickup object
 */
export function getNextPickup(fromDate = new Date()): Pickup {
  const pickupDate = getNextPickupDate(fromDate);
  const isRecycling = getIsRecycling(pickupDate);
  const relativeText = getRelativeText(fromDate, pickupDate);
  return {
    date: pickupDate,
    isRecycling,
    relativeText,
  };
}
