import BinText from "./BinText";
import type { Collection } from "../lib/nextCollection";
import { Temporal } from "temporal-polyfill";
import { formatDate } from "../lib/format";

export function CollectionText({
  collection: { date: collectionDate, withRecycling },
  nowDate,
}: Readonly<{
  collection: Collection;
  nowDate: Temporal.PlainDate;
}>) {
  const diffDays = nowDate.until(collectionDate).total({ unit: "days" });

  if (diffDays === 0 || diffDays === 1) {
    const todayOrTomorrow = diffDays === 0 ? "today" : "tomorrow";
    return (
      <>
        The collection {todayOrTomorrow} is
        <br />
        <BinText withRecycling={withRecycling} />.
      </>
    );
  } else {
    return (
      <>
        The next collection on
        <br />
        {formatDate(collectionDate)}, is
        <br />
        <BinText withRecycling={withRecycling} />.
      </>
    );
  }
}
