import { Temporal } from "temporal-polyfill";

export function formatDate(date: Temporal.PlainDate) {
  const dayOfWeek = date.toLocaleString(undefined, { weekday: "long" });
  const month = date.toLocaleString(undefined, { month: "long" });
  const day = date.toLocaleString(undefined, { day: "numeric" });
  const ordinalSuffix = getOrdinalSuffix(date.day);

  return `${dayOfWeek}, ${month} ${day}${ordinalSuffix}`;
}

const ordinalSuffixes = [
  "th", // 0th
  "st", // 1st
  "nd", // 2nd
  "rd", // 3rd
];
export function getOrdinalSuffix(n: number) {
  if (!Number.isInteger(n)) {
    throw new Error("Input must be an integer");
  }

  // Special case for 11, 12, 13
  const lastTwoDigits = n % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `th`;
  }

  return ordinalSuffixes[n % 10] ?? "th";
}
