import FlexRow, { FlexRowProps, AlignTypes } from "../src/components/blocks/parts/FlexRow";
import { Box, Image } from "@chakra-ui/react";
export interface ColumnsImagesProps {
  image_align?: string;
  options_columns: {
    // TODO change align to justify in Strapi
    align: FlexRowProps["justify"];
    columns: string;
  };
  images: Global.Image[];
}

const prefix = process.env.IMAGE_URL || "http://localhost:1337";

export const ColumnsImages = ({ content }: { content: ColumnsImagesProps }) => {
  const { align, columns } = content.options_columns;
  const { image_align = "center" } = content;

  const colWidth =
    (100 / parseInt(columns.replace("c_", ""), 10)).toFixed(4) + "%";

//TODO Fix Alignment

  return (
    <FlexRow justify={align} align={image_align as keyof typeof AlignTypes}>
      {content.images &&
        content.images.map((image, i) => {
          const { url, alternativeText: alt, width, height } = image;
          const imageProps = {
            src: prefix + url,
            htmlWidth: width,
            htmlHeight: height,
            width: "100%",
          };
          return (
            <Box w={colWidth} h="100%" key={`col-image-${i}`}>
              <Image alt={alt || ""} {...imageProps} />
            </Box>
          );
        })}
    </FlexRow>
  );
};
