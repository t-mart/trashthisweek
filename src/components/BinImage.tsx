import Image from "next/image";
import TrashBin from "@/images/trash.jpg";
import RecyclingBin from "@/images/recycling.jpg";

export type BinType = "trash" | "recycling";

const trashAlt = "Trash bin";

const recyclingAlt = "Recycling bin";

export default function BinImage({ binType }: { binType: BinType }) {
  const src = binType === "trash" ? TrashBin : RecyclingBin;
  const alt = binType === "trash" ? trashAlt : recyclingAlt;
  return (
    <Image
      src={src}
      alt={alt}
      className="rounded-lg shadow-lg w-full"
      priority
    />
  );
}
