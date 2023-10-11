import { Box } from "@chakra-ui/react";
import { BtnProps } from "./parts/PButton";
import { Buttons } from "./Buttons";
import PEditorParse from "./parts/PEditorParse";

// Todo Set Global Vertical Padding for Buttons
// TODO Check if PEditorParse needs padding
export interface HeadingInfoProps {
  content: {
    title?: string;
    text?: string;
    text_align?: string;
    buttons?: BtnProps[] | null;
  }

}

export const HeadingInfo = ( {content}:  HeadingInfoProps ): React.ReactElement => {
  const btnContent = {
    align: content.text_align || "left",
    button: content.buttons || [],
  };
  return (
    <Box className="block __heading-info">
      {content.title && (
        <Box as="h2" textStyle="h2">
          {content.title}
        </Box>
      )}
      {content.text && (
        <Box as="p" textStyle="body1" >
          {content.text}
        </Box>
      )}
      { content.buttons && content.buttons.length ? (
        <Box py="4">
          <Buttons content={btnContent} />
        </Box>
      ): null}
    </Box>
  );
};
