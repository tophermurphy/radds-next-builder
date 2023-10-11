import { Box, BoxProps } from "@chakra-ui/react";
import { PTextEditorProps } from "./parts/PTextEditor";
import { Content, ContentProps, widthMap } from "./Content";
import FlexRow, { FlexRowProps } from "./parts/FlexRow";

export interface ColumnsContentProps {
  text_editor: PTextEditorProps[];
  options_columns: {
    justify: FlexRowProps["justify"];
    columns: string;
  };
}

export const ColumnsContent = ({
  content,
}: {
  content: ColumnsContentProps;
}) => {
  const { justify, columns } = content.options_columns;
  const colWidth =
    (100 / parseInt(columns.replace("c_", ""), 10)).toFixed(4) + "%";

  return (
    <FlexRow justify={justify} >
      {content.text_editor &&
        content.text_editor.map((item, i) => {
          const contentProps: ContentProps = {
            text_editor: item,
            width: "100%",
          };

          const boxProps: BoxProps = {
            w: widthMap[item.width_adjust] || colWidth,
          };

          return (
            <Box {...boxProps} key={`columns-content-${i}`}>
              <Content content={contentProps} />
            </Box>
          );
        })}
    </FlexRow>
  );
};
