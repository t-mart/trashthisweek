export type BinType = "trash" | "recycling";

const trashAlt = "Trash bin";

const recyclingAlt = "Recycling bin";

export default function BinImage({ binType }: { binType: BinType }) {
  const src = binType === "trash" ? '/trash.webp' : '/recycling.webp';
  const alt = binType === "trash" ? trashAlt : recyclingAlt;
  return <img src={src} alt={alt} className="w-full" />;
}
