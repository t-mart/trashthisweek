import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(timezone); // gives timezone support

// The timezone where our trash pickup occurs.
dayjs.tz.setDefault('America/Chicago');

/**
 * Represents a trash pickup date and if that pickup has recycling.
 */
export class Pickup {
    /**
     * Date when pickup will occur.
    */
    date: dayjs.Dayjs;
    /**
     * True if date is a recycling day.
    */
    isRecyclingDay: boolean;

    /**
     * A known trash and recycle day to use as a reference for all other pickup days.
     */
    private static known_trash_and_recycle_day = dayjs('2022-03-16');

    /**
     * The day of the week when pickup occurs. (Zero-indexed because thats what dayjs expects)
     */
    private static pickupDayIndex = 3;

    constructor(date: dayjs.Dayjs, isRecyclingDay: boolean) {
        this.date = date;
        this.isRecyclingDay = isRecyclingDay;
    }

    /**
     * From a given date, determine the next trash pickup date and if that pickup also has
     * recycling. If the given date is a trash pickup date, it will be considered the next pickup
     * date.
     * @param fromDate An reference date to calculate the next pickup date from.
     * @returns A Pickup object
     */
    static after(fromDate: dayjs.Dayjs): Pickup {
        let nextPickupDate: dayjs.Dayjs;
        if (fromDate.day() <= Pickup.pickupDayIndex) {
            nextPickupDate = fromDate.day(Pickup.pickupDayIndex).startOf('day');
        } else {
            nextPickupDate = fromDate.add(1, 'week')
                .day(Pickup.pickupDayIndex).startOf('day');
        }

        const weeksBetween = dayjs(nextPickupDate).diff(Pickup.known_trash_and_recycle_day, 'week');
        const isRecyclingDay = weeksBetween % 2 === 0;

        return new Pickup(nextPickupDate, isRecyclingDay);
    }

}
