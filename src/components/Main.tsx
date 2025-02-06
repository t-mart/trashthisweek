import { Temporal } from "temporal-polyfill";
import { getNextCollection } from "@lib/nextCollection";
import { CollectionText } from "./CollectionText";
import BinImages from "./BinImages";

export default function Home({ now }: Readonly<{ now: Temporal.PlainDate }>) {
  const nextCollection = getNextCollection(now);
  return (
    <>
      <div className="@container">
        <h2 className="text-[clamp(1rem,_7cqi,_3rem)]/[clamp(2rem,_12cqi,_4rem)] font-bold text-center">
          <CollectionText collection={nextCollection} nowDate={now} />
        </h2>
      </div>
      <div className="mt-8">
        <BinImages withRecycling={nextCollection.withRecycling} />
      </div>
    </>
  );
}
