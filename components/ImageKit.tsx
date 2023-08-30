import { Image as ImageType } from "@/types/cms";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { FC } from "react";

type Props = {
  image?: ImageType;
  width: number;
  height: number;
  alt?: string;
} & Omit<ImageProps, "src" | "alt">;

const ImageKit: FC<Props> = function ({
  image,
  width,
  height,
  alt,
  className,
  ...props
}) {
  return image && image.imagekit?.url ? (
    <Image
      className={clsx("object-cover", className)}
      src={`${image.imagekit?.url!}?tr=w-${width * 2},h-${height * 2},c-at_max`}
      alt={alt ?? image.altText!}
      width={width}
      height={height}
      {...props}
    />
  ) : null;
};

export default ImageKit;
