import { Box, BoxProps, Image as CImage, ImageProps } from "@chakra-ui/react";
import FlexRow, { AlignTypes } from "../src/components/blocks/parts/FlexRow";
import PEditorParse from "./parts/PEditorParse";

//TODO Image Max-Height

export interface ImageTextProps {
  body: string;
  image_width: keyof typeof ImageWidth;
  image_side: "left" | "right";
  image_v_align: keyof typeof AlignTypes;
  separate_blocks: boolean;
  media: Global.ImageWithFormats;
  bg_color: Global.Color;
}

export const ImageWidth = {
  quarter: 25,
  third: 33.3333,
  half: 50,
  two_fifths: 40,
  two_thirds: 66.6666,
  three_quarters: 75,
} as const;

export const ImageText = ({ content }: { content: ImageTextProps }) => {
  const {
    body,
    image_width = "half",
    image_side = "left",
    image_v_align = "center",
    separate_blocks = false,
    media: image,
    bg_color,
  } = content;

  const prefix = process.env.IMAGE_URL || "http://localhost:1337";
  let CImageProps: ImageProps = {
    src: prefix + image.url,
    alt: image.alternativeText || "",
    htmlHeight: image.height,
    htmlWidth: image.width,
    width: "auto",
    height: image_v_align === "stretch" ? "100%" : "auto",
    fit: image_v_align == "stretch" ? "cover" : "contain",
  };
  let imageBoxProps: BoxProps = {
    width: `${ImageWidth[image_width]}%`,
    display: "flex",
    flexDirection: "column",
    order: image_side === "left" ? 0 : 1,
  };

  let wrapProps: BoxProps = {
    height: '100%'
  };
  let textWrapProps: BoxProps = {};

  const bgColorProps: BoxProps = {
    backgroundColor: bg_color
      ? bg_color.name + ".100"
      : "transparent",
    p: bg_color ? 4 : 0,
    height: "100%",
  };

  const stretchText: BoxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  if (bg_color) {
    if (separate_blocks) {
      textWrapProps = { ...textWrapProps, ...bgColorProps };
    } else {
      wrapProps = { ...wrapProps, ...bgColorProps };
    }
  }

  if (image_v_align === "stretch") {
    textWrapProps = { ...textWrapProps, ...stretchText };
  }

  return (
    <Box {...wrapProps}>
      <FlexRow wrap={false} height="100%" align={image_v_align}>
        <Box {...imageBoxProps} className="__image">
          <CImage {...CImageProps} />
        </Box>
        <Box flex="1 1 auto" className="__text">
          <Box {...textWrapProps} className="__wrap">
            <PEditorParse body={body} />
          </Box>
        </Box>
      </FlexRow>
    </Box>
  );
};
