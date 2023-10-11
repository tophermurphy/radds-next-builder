import BlockError from "@/components/BlockError";
import Nodes from "./_Nodes";
import { Box, BoxProps } from "@chakra-ui/react";

//TODO fix link style dropdown in Strapi
export interface PEditorParseProps extends BoxProps {
  body: string;
}

export const PEditorParse = ({ body, ...boxProps }: PEditorParseProps) => {
  let bodyJSON;
  try {
     bodyJSON = JSON.parse(body);
  } catch {
    console.error("Content is not valid JSON.");
    return <BlockError error_msg="Content is not valid JSON." />;
  }
  return (
    <Box {...boxProps} className="__p-editor-body">
      { bodyJSON && bodyJSON.content &&
        bodyJSON.content.map((node: Strapi.EditorNode, i: number) => (
           <Nodes key={`index-${i}`} node={node} />
        ))}
    </Box>
  );
};

export default PEditorParse;
