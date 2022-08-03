import {
  nextWednesday,
  differenceInWeeks,
  isWednesday,
  startOfDay,
  isSameDay,
  format,
  addDays,
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

// <Today, August 3rd>, is ...
// <Tomorrow, August 3rd>, is ...
// <Next Wednesday, August 3rd>,
function getRelativeText(fromDate: Date, toDate: Date) {
  const formatted = format(toDate, RELATIVE_FORMAT);
  if (isSameDay(fromDate, toDate)) {
    return `Today, ${formatted}`;
  } else if (isSameDay(addDays(fromDate, 1), toDate)) {
    return `Tomorrow, ${formatted}`;
  }
  return `Next ${format(toDate, "EEEE")}, ${formatted}`;
}

/**
 * Returns the next pickup date if its a recycling day, and a string of words that describe the next
 * day. If today is a pickup day, return that instead.
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
