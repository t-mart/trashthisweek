import {
  getNextCollection,
  type Collection,
  dateInPflugerville,
} from "@/lib/nextCollection";
import QueryError from "@/components/QueryError";
import { Temporal } from "temporal-polyfill";
import { formatDate } from "@/lib/format";
import BinImage from "@/components/BinImage";
import React from "react";

const BinText = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <span className="underline">{children}</span>
);
const Trash = () => (
  <BinText>
    <span className="text-trash">trash</span>
  </BinText>
);
const Recycling = () => (
  <BinText>
    <span className="text-recycling">recycling</span>
  </BinText>
);

function CollectionText({
  collection: { date: collectionDate, withRecycling },
}: {
  collection: Collection;
}) {
  const binMarkup = withRecycling ? (
    <>
      <Trash /> and <Recycling />
    </>
  ) : (
    <>
      just <Trash />
    </>
  );

  const now = dateInPflugerville();
  const diffDays = now.until(collectionDate).total({ unit: "days" });

  if (diffDays === 0 || diffDays === 1) {
    const todayOrTomorrow = diffDays === 0 ? "today" : "tomorrow";
    return (
      <>
        The collection {todayOrTomorrow} is
        <br />
        {binMarkup}.
      </>
    );
  } else {
    return (
      <>
        The next collection on
        <br />
        {formatDate(collectionDate)}, is
        <br />
        {binMarkup}.
      </>
    );
  }
}

function BinImages({
  collection: { withRecycling },
}: {
  collection: Collection;
}) {
  return (
    <div className="flex justify-center gap-4">
      <BinImage binType="trash" />
      {withRecycling && <BinImage binType="recycling" />}
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let queryStr = (await searchParams).query;

  if (typeof queryStr === "object") {
    queryStr = queryStr[queryStr.length - 1] ?? "";
  }

  let queryDate;
  if (queryStr !== undefined) {
    try {
      queryDate = Temporal.PlainDate.from(queryStr);
    } catch (e) {
      return <QueryError queryStr={queryStr} error={e} />;
    }
  }

  const nextCollection = getNextCollection(queryDate);
  return (
    <>
      <div className="@container">
        <h2 className="text-[clamp(1rem,_7cqi,_3rem)]/[clamp(2rem,_12cqi,_4rem)] font-bold text-center">
          <CollectionText collection={nextCollection} />
        </h2>
      </div>
      <div className="mt-8">
        <BinImages collection={nextCollection} />
      </div>
    </>
  );
}
