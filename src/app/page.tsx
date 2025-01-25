import {
  getNextCollection,
  type Collection,
  dateInPflugerville,
} from "@/lib/nextCollection";
import ParamDateError from "@/components/ParamDateError";
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
  nowDate,
}: {
  collection: Collection;
  nowDate: Temporal.PlainDate;
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

  const diffDays = nowDate.until(collectionDate).total({ unit: "days" });

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

function getParamDate(value: string | string[] | undefined) {
  if (typeof value === "object") {
    // supposedly, this is safe because the only way this form would occur is if
    // the search param is provided multiple times, so there must be at least
    // one value.
    value = value[value.length - 1]!;
  }

  if (value === undefined) {
    return { date: undefined, error: undefined };
  }

  try {
    return { date: Temporal.PlainDate.from(value), error: undefined };
  } catch (e) {
    return { date: undefined, error: e };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { now } = await searchParams;

  const nowParamDate = getParamDate(now);
  let { date: nowDate } = nowParamDate;
  const { error: nowError } = nowParamDate;
  if (nowError) {
    return <ParamDateError value={now} name="now" error={nowError} />;
  }
  if (nowDate === undefined) {
    nowDate = dateInPflugerville();
  }

  const nextCollection = getNextCollection(nowDate);
  return (
    <>
      <div className="@container">
        <h2 className="text-[clamp(1rem,_7cqi,_3rem)]/[clamp(2rem,_12cqi,_4rem)] font-bold text-center">
          <CollectionText collection={nextCollection} nowDate={nowDate} />
        </h2>
      </div>
      <div className="mt-8">
        <BinImages collection={nextCollection} />
      </div>
    </>
  );
}
