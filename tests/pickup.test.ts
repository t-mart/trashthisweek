import dayjs from 'dayjs';

import { Pickup } from '../src/pickup';

test('calculates next pickup days correctly', () => {
    const tests = [
        { from: dayjs('2022-03-31'), expectedPickup: dayjs('2022-04-06') },
        { from: dayjs('2022-04-01'), expectedPickup: dayjs('2022-04-06') },
        { from: dayjs('2022-04-02'), expectedPickup: dayjs('2022-04-06') },
        { from: dayjs('2022-04-03'), expectedPickup: dayjs('2022-04-06') },
        { from: dayjs('2022-04-04'), expectedPickup: dayjs('2022-04-06') },
        { from: dayjs('2022-04-05'), expectedPickup: dayjs('2022-04-06') },
        { from: dayjs('2022-04-06'), expectedPickup: dayjs('2022-04-06') },
        { from: dayjs('2022-04-07'), expectedPickup: dayjs('2022-04-13') },
    ];
    tests.forEach(({ from, expectedPickup }) => expect(
        Pickup.after(from).date.isSame(expectedPickup, 'day')).toBeTruthy()
    );
});

test('determines recycling day', () => {
    const tests = [
        { from: dayjs('2022-03-31'), expectedIsRecycling: false },
        { from: dayjs('2022-04-01'), expectedIsRecycling: false },
        { from: dayjs('2022-04-02'), expectedIsRecycling: false },
        { from: dayjs('2022-04-03'), expectedIsRecycling: false },
        { from: dayjs('2022-04-04'), expectedIsRecycling: false },
        { from: dayjs('2022-04-05'), expectedIsRecycling: false },
        { from: dayjs('2022-04-06'), expectedIsRecycling: false },
        { from: dayjs('2022-04-07'), expectedIsRecycling: true },
    ];
    tests.forEach(({ from, expectedIsRecycling }) => expect(
        Pickup.after(from).isRecyclingDay).toBe(expectedIsRecycling)
    );
});
