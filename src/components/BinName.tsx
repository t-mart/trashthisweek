import type { BinType } from "@lib/binType";

const className = "underline decoration-foreground";

export default function BinName({
  binType,
}: Readonly<{
  binType: BinType;
}>) {
  if (binType === "trash") {
    return <span className={`${className} text-trash`}>trash</span>;
  }

  return <span className={`${className} text-recycling`}>recycling</span>;
}
