import { Box, BoxProps } from "@chakra-ui/react";
import PEditorParse from "./parts/PEditorParse";
export interface ContentProps {
  text_editor: TextEditor;
  width?: string;
}

//TODO Extend Props to pass along Box Props if needed
// ? Do I want to have this on all Components??

type TextEditor = {
  body: string;
  add_border: boolean;
  width_adjust: string;
   bg_color?: Strapi.BlockBGColor;
};

// ? In STRAPI Do I want this to just be an number percentage??
export const widthMap: Util.ObjectMap = {
  quarter: "25%",
  third: "33.333%",
  two_fifths: "40%",
  half: "50%",
  two_thirds: "66.666%",
};

export const Content = ({
  content: {
    width,
    text_editor: {
      body,
      add_border = false,
      width_adjust = "none",
      bg_color,
    },
  },
}: {
  content: ContentProps;
}) => {
  const bgColor =  bg_color?.data?.attributes?.name ?? "transparent";

  const boxWidth = width || widthMap[width_adjust] || "100%";

  let boxProps: BoxProps = {
    bg: bgColor,
    width: boxWidth,
    maxW: "100%",
    h: '100%'
  };
  if (add_border) {
    // TODO Global Border Width??
    boxProps.border = "solid 1px";
  }
  if (bgColor !== "transparent") {
    boxProps.p = "6";
    boxProps.bgColor = bgColor + ".100";
    boxProps.borderColor = bgColor + ".700";
  }
  return (
    <Box {...boxProps}>
      <PEditorParse body={body} />
    </Box>
  );
};
