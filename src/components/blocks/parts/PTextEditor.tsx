import PEditorParse from "./PEditorParse";
import { Box, BoxProps } from "@chakra-ui/react";

export interface PTextEditorProps {
  body: string;
  add_border: boolean;
  width_adjust: string;
  background_color: Strapi.BlockBGColor;
}

export const PTextEditor = ({
  text_editor,
}: {
  text_editor: PTextEditorProps;
}) => {
  const bgColor =
    text_editor.background_color.data?.attributes?.name ?? "transparent";

// ? Do I want this to just be an number percentage??
  const widthMap: Util.ObjectMap = {
    none: "100%",
    quarter: "25%",
    third: "33.333%",
    two_fifths: "40%",
    half: "50%",
    two_thirds: "66.666%"
  };

  const boxWidth = widthMap[text_editor.width_adjust] || "100%";

  let boxProps: BoxProps = {
    mx: "auto",
    bg: bgColor,
    w: ["100%", boxWidth],
  };
  if (text_editor.add_border) {
    // TODO Global Border Width??
    boxProps.border = "solid 1px";
  }
  if (bgColor !== "transparent") {
    boxProps.p = "6";
    boxProps.bgColor = bgColor + ".100";
    boxProps.borderColor = bgColor + ".700";
  }
  return <Box className="__p-editor" {...boxProps}><PEditorParse body={text_editor.body} /></Box>;
};

export default PTextEditor;
