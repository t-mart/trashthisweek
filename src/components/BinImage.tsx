import Image from "next/image";

export type BinType = "trash" | "recycling";

const imageWidth = 320;
const imageHeight = 425;

const trashSrc = "/trash.jpg";
const trashAlt = "Trash bin";

const recyclingSrc = "/recycling.jpg";
const recyclingAlt = "Recycling bin";

export default function BinImage({ binType }: { binType: BinType }) {
  const src = binType === "trash" ? trashSrc : recyclingSrc;
  const alt = binType === "trash" ? trashAlt : recyclingAlt;
  return (
    <Image
      src={src}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className="rounded-lg shadow-lg w-full"
      priority
    />
  );
}
