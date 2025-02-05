import BinName from "./BinName";

export default function BinText({
  withRecycling,
}: Readonly<{ withRecycling: boolean }>) {
  if (!withRecycling) {
    return (
      <>
        just{" "}
        <BinName binType="trash" />
      </>
    );
  }

  return (
    <>
      <BinName binType="trash" /> and <BinName binType="recycling" />
    </>
  );
}
