import { DateTime } from 'luxon';

export const timeZone = 'America/Chicago';
export const referenceRecyclingWeekDateTime = DateTime.fromISO('2023-08-02T00:00:00', { zone: timeZone });
export const trashDayOfWeek = 3; // Wednesday
export const refParameter = 'ref';
