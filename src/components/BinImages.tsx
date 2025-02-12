const className = "rounded-lg shadow-lg";
const height = 664;
const width = 500;

function Trash() {
  return (
    <img
      src="/trash.webp"
      alt="Trash bin"
      height={height}
      width={width}
      className={className}
    />
  );
}

function Recycling() {
  return (
    <img
      src="/recycling.webp"
      alt="Recycling bin"
      height={height}
      width={width}
      className={className}
    />
  );
}

export default function BinImages({
  withRecycling,
}: {
  withRecycling: boolean;
}) {
  return (
    <div className="flex justify-center gap-4 mx-auto">
      <Trash />
      {withRecycling && <Recycling />}
    </div>
  );
}
