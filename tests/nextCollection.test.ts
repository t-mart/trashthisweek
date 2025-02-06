import { test, expect } from "vitest";
import { getNextCollection, type Collection } from "@lib/nextCollection";
import { Temporal } from "temporal-polyfill";

type Fixture = {
  now: Temporal.PlainDate;
  expected: Collection;
};

type StringedFixture = Fixture & {
  nowDateString: string;
  expectedDateString: string;
  withRecyclingString: string;
};

/**
 * This is for better test naming: vitest just does a simple toString on
 * arguments, which looks bad for temporal-polyfill. Here, we augment the
 * fixture to include better string representations.
 */
function toStringedFixture(f: Fixture): StringedFixture {
  return {
    ...f,
    nowDateString: f.now.toString(),
    expectedDateString: f.expected.date.toString(),
    withRecyclingString: f.expected.withRecycling ? "trash+recycle" : "trash",
  };
}

function pd(date: string) {
  return Temporal.PlainDate.from(date);
}

test.for<StringedFixture>(
  [
    // recycling thursday
    {
      now: pd("2025-01-23"),
      expected: {
        date: pd("2025-01-29"),
        withRecycling: true,
      },
    },

    // recycling friday
    {
      now: pd("2025-01-24"),
      expected: {
        date: pd("2025-01-29"),
        withRecycling: true,
      },
    },

    // recycling saturday
    {
      now: pd("2025-01-25"),
      expected: {
        date: pd("2025-01-29"),
        withRecycling: true,
      },
    },

    // recycling sunday
    {
      now: pd("2025-01-26"),
      expected: {
        date: pd("2025-01-29"),
        withRecycling: true,
      },
    },

    // recycling monday
    {
      now: pd("2025-01-27"),
      expected: {
        date: pd("2025-01-29"),
        withRecycling: true,
      },
    },

    // recycling tuesday
    {
      now: pd("2025-01-28"),
      expected: {
        date: pd("2025-01-29"),
        withRecycling: true,
      },
    },

    // recycling wednesday (collection day itself)
    {
      now: pd("2025-01-29"),
      expected: {
        date: pd("2025-01-29"),
        withRecycling: true,
      },
    },

    // non-recycling thursday
    {
      now: pd("2025-01-30"),
      expected: {
        date: pd("2025-02-05"),
        withRecycling: false,
      },
    },

    // non-recycling friday
    {
      now: pd("2025-01-31"),
      expected: {
        date: pd("2025-02-05"),
        withRecycling: false,
      },
    },

    // non-recycling saturday
    {
      now: pd("2025-02-01"),
      expected: {
        date: pd("2025-02-05"),
        withRecycling: false,
      },
    },

    // non-recycling sunday
    {
      now: pd("2025-02-02"),
      expected: {
        date: pd("2025-02-05"),
        withRecycling: false,
      },
    },

    // non-recycling monday
    {
      now: pd("2025-02-03"),
      expected: {
        date: pd("2025-02-05"),
        withRecycling: false,
      },
    },

    // non-recycling tuesday
    {
      now: pd("2025-02-04"),
      expected: {
        date: pd("2025-02-05"),
        withRecycling: false,
      },
    },

    // non-recycling wednesday (collection day itself)
    {
      now: pd("2025-02-05"),
      expected: {
        date: pd("2025-02-05"),
        withRecycling: false,
      },
    },

    // after a DST transition
    {
      now: pd("2025-03-09"),
      expected: {
        date: pd("2025-03-12"),
        withRecycling: true,
      },
    },

    // after two DST transitions
    {
      now: pd("2025-11-02"),
      expected: {
        date: pd("2025-11-05"),
        withRecycling: true,
      },
    },

    // Christmas 2024, a Wednesday that should be skipped and pushed to Thursday
    {
      now: pd("2024-12-25"),
      expected: {
        date: pd("2024-12-26"),
        withRecycling: false,
      },
    },

    // should still be pushed to Thursday
    {
      now: pd("2024-12-26"),
      expected: {
        date: pd("2024-12-26"),
        withRecycling: false,
      },
    },

    // New Years 2025, a Wednesday that should be skipped and pushed to Thursday
    {
      now: pd("2025-01-01"),
      expected: {
        date: pd("2025-01-02"),
        withRecycling: true,
      },
    },

    // should still be pushed to Thursday
    {
      now: pd("2025-01-02"),
      expected: {
        date: pd("2025-01-02"),
        withRecycling: true,
      },
    },

    // implementation detail, but have it return the actual reference date. this
    // causes errors before.
    {
      now: pd("2025-01-15"),
      expected: {
        date: pd("2025-01-15"),
        withRecycling: true,
      },
    },

    // and day before too, sure
    {
      now: pd("2025-01-14"),
      expected: {
        date: pd("2025-01-15"),
        withRecycling: true,
      },
    },

    // arbitrary date before reference
    {
      now: pd("2024-09-14"),
      expected: {
        date: pd("2024-09-18"),
        withRecycling: false,
      },
    },
  ].map(toStringedFixture)
)(
  "getNextCollection($nowDateString) -> ($expectedDateString, $withRecyclingString)",
  ({ now, expected }) => {
    const actual = getNextCollection(now);

    expect(actual.date.toString()).toEqual(expected.date.toString());
    expect(actual.withRecycling).toEqual(expected.withRecycling);
  }
);
