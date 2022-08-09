import { getNextPickup } from "../src/pickup";

test.each([
  {
    name: "pickup is today and has recycling",
    now: new Date("2022-08-03T00:00:00-0500"),
    expected: {
      date: new Date("2022-08-03T00:00:00-0500"),
      isRecycling: true,
      relativeText: "Today, August 3rd",
    },
  },
  {
    name: "pickup is tomorrow and has recycling",
    now: new Date("2022-08-02T23:59:59-0500"),
    expected: {
      date: new Date("2022-08-03T00:00:00-0500"),
      isRecycling: true,
      relativeText: "Tomorrow, August 3rd",
    },
  },
  {
    name: "pickup is this Wednesday and has recycling",
    now: new Date("2022-07-31T00:00:00-0500"),
    expected: {
      date: new Date("2022-08-03T00:00:00-0500"),
      isRecycling: true,
      relativeText: "This Wednesday, August 3rd",
    },
  },
  {
    name: "pickup is next Wednesday and has recycling",
    now: new Date("2022-07-30T23:59:59-0500"),
    expected: {
      date: new Date("2022-08-03T00:00:00-0500"),
      isRecycling: true,
      relativeText: "Next Wednesday, August 3rd",
    },
  },
  {
    name: "pickup is today and does not have recycling",
    now: new Date("2022-08-10T00:00:00-0500"),
    expected: {
      date: new Date("2022-08-10T00:00:00-0500"),
      isRecycling: false,
      relativeText: "Today, August 10th",
    },
  },
  {
    name: "pickup is tomorrow and does not have recycling",
    now: new Date("2022-08-09T00:00:00-0500"),
    expected: {
      date: new Date("2022-08-10T00:00:00-0500"),
      isRecycling: false,
      relativeText: "Tomorrow, August 10th",
    },
  },
  {
    name: "pickup is this Wednesday and does not have recycling",
    now: new Date("2022-08-07T00:00:00-0500"),
    expected: {
      date: new Date("2022-08-10T00:00:00-0500"),
      isRecycling: false,
      relativeText: "This Wednesday, August 10th",
    },
  },
  {
    name: "pickup is next Wednesday and does not have recycling",
    now: new Date("2022-08-06T23:59:59-0500"),
    expected: {
      date: new Date("2022-08-10T00:00:00-0500"),
      isRecycling: false,
      relativeText: "Next Wednesday, August 10th",
    },
  },

])("$name", ({now, expected}) => {
  expect(getNextPickup(now)).toEqual(expected)
});
