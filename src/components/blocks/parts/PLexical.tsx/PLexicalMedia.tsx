//! Image fields must be saved in modal and page
//TODO: Images are biggie, rethink sizes

import { Flex } from "@mantine/core";
import Image from "next/image";

type ImageSize = {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  url: string;
  filename: string;
};

type Sizes = "thumbnail" | "small" | "medium" | "large";

type ImageSizes = {
  [key in Sizes]: ImageSize;
};
export interface ImageNode {
  fields?: {
    size?: "thumbnail" | "small" | "medium" | "large";
    position?: "left" | "right" | "center";
  };
  value: ImageSize & {
    id: string;
    alt?: string;
    sizes: ImageSizes;
  };
}

export interface PLexicalMedia {
  content: ImageNode;
}

export const PLexicalMedia = ({ content }: PLexicalMedia) => {
  const { id, alt = "", width, height, url, sizes, filename } = content.value;
  const { position = "left", size } = content.fields || {};
  const prefix = process.env.NEXT_PUBLIC_MEDIAPATH || 'media/';

  let imageSrc: { width: number; height: number; src: string };

  if (size && sizes[size]) {
    const img = sizes[size];
    imageSrc = {
      width: img.width,
      height: img.height,
      src: prefix + img.filename,
    };
  } else {
    imageSrc = {
      width,
      height,
      src: prefix + filename,
    };
  }
  const imageProps = {
    ...imageSrc,
    id: id,
  };

  return (
    <Flex justify={position}>
      <Image alt={alt} {...imageProps} />
    </Flex>
  );
};

export default PLexicalMedia;
