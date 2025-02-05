import type { BinType } from "../lib/binType";

export default function BinName({
  binType,
}: Readonly<{
  binType: BinType;
}>) {
  const textClass = binType === "trash" ? "text-trash" : "text-recycling";
  const textContent = binType === "trash" ? "trash" : "recycling";
  return <span className={`underline ${textClass}`}>{textContent}</span>;
}
