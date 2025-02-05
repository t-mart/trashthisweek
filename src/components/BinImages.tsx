const className = "w-full";

function Trash() {
  return <img src="/trash.webp" alt="Trash bin" className={className} />;
}

function Recycling() {
  return (
    <img src="/recycling.webp" alt="Recycling bin" className={className} />
  );
}

export default function BinImages({
  withRecycling,
}: {
  withRecycling: boolean;
}) {
  return (
    <div className="flex justify-center gap-4">
      <Trash />
      {withRecycling && <Recycling />}
    </div>
  );
}
