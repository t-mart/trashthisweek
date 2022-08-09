import { getNextPickup } from "../src/pickup";

test("pickup is today and has recycling", () => {
  const pickup = getNextPickup(new Date("2022-08-03T00:00:00-0500"));
  expect(pickup.date).toEqual(new Date("2022-08-03T00:00:00-0500"));
  expect(pickup.isRecycling).toBe(true);
  expect(pickup.relativeText).toBe("Today, August 3rd");
});

test("pickup is tomorrow and has recycling", () => {
  const pickup = getNextPickup(new Date("2022-08-02T23:59:59-0500"));
  expect(pickup.date).toEqual(new Date("2022-08-03T00:00:00-0500"));
  expect(pickup.isRecycling).toBe(true);
  expect(pickup.relativeText).toBe("Tomorrow, August 3rd");
});

test("pickup is this coming Wednesday (in this week) and has recycling", () => {
  const pickup = getNextPickup(new Date("2022-08-01T12:34:56-0500")); // beginning of sunday
  expect(pickup.date).toEqual(new Date("2022-08-03T00:00:00-0500"));
  expect(pickup.isRecycling).toBe(true);
  expect(pickup.relativeText).toBe("This Wednesday, August 3rd");
});

test("pickup is next Wednesday (in the next week) and has recycling", () => {
  const pickup = getNextPickup(new Date("2022-07-30T12:34:56-0500")); // end of saturday
  expect(pickup.date).toEqual(new Date("2022-08-03T00:00:00-0500"));
  expect(pickup.isRecycling).toBe(true);
  expect(pickup.relativeText).toBe("Next Wednesday, August 3rd");
});

test("pickup is today and doesn't have recycling", () => {
  const pickup = getNextPickup(new Date("2022-08-10T00:00:00-0500"));
  expect(pickup.date).toEqual(new Date("2022-08-10T00:00:00-0500"));
  expect(pickup.isRecycling).toBe(false);
  expect(pickup.relativeText).toBe("Today, August 10th");
});

test("pickup is tomorrow and doesn't have recycling", () => {
  const pickup = getNextPickup(new Date("2022-08-09T23:59:59-0500"));
  expect(pickup.date).toEqual(new Date("2022-08-10T00:00:00-0500"));
  expect(pickup.isRecycling).toBe(false);
  expect(pickup.relativeText).toBe("Tomorrow, August 10th");
});

test("pickup is this coming Wednesday (in the next week) and doesn't have recycling", () => {
  const pickup = getNextPickup(new Date("2022-08-06T23:59:59-0500")); // end of saturday
  expect(pickup.date).toEqual(new Date("2022-08-10T00:00:00-0500"));
  expect(pickup.isRecycling).toBe(false);
  expect(pickup.relativeText).toBe("Next Wednesday, August 10th");
});

test("pickup is next Wednesday (in this week) and doesn't have recycling", () => {
  const pickup = getNextPickup(new Date("2022-08-08T12:34:56-0500")); // beginning of sunday
  expect(pickup.date).toEqual(new Date("2022-08-10T00:00:00-0500"));
  expect(pickup.isRecycling).toBe(false);
  expect(pickup.relativeText).toBe("This Wednesday, August 10th");
});
