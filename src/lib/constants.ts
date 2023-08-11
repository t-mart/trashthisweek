import { DateTime } from 'luxon';

/**
 * A known date that is a pickup date and has recycling. From this, we derive
 * the day of the week on which pickups occur, the timezone in which pickups
 * occur, and the recycling schedule.
 */
export const baseRecyclingPickupDateTime = DateTime.fromISO('2023-08-02T00:00:00', {
	zone: 'America/Chicago'
});
export const refParameter = 'ref';
