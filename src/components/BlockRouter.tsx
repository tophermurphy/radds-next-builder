import type {
  BlockAccordion,
  BlockButtons,
  BlockCard,
  BlockHeading,
  BlockParagraph,
  BlockTextEditor,
  BlockDivider,
  BlockImage,
  BlockQuote,
  BlockTabs
} from "@/types/payload-types";

import { Box } from "@mantine/core";
import Heading from "./blocks/Heading";
import Paragraph from "./blocks/Paragraph";
import Accordion from "./blocks/Accordion";
import Buttons from "./blocks/Buttons";
import Card from "./blocks/Card";
import TextEditor from "./blocks/TextEditor";
import Divider from "./blocks/Divider";
import Image from "./blocks/Image";
import Quote from "./blocks/Quote";
import Tabs from "./blocks/Tabs";

//TODO fix the typing with generic
export type Blocks =
  | BlockHeading
  | BlockParagraph
  | BlockAccordion
  | BlockCard
  | BlockButtons
  | BlockTextEditor
  | BlockDivider
  | BlockImage 
  | BlockQuote
  | BlockTabs;

type BlockType = {
  content: Blocks;
};
interface ReactMap {
  [key: string]: React.FC<BlockType>;
}

export const BlockMap: ReactMap = {
  paragraph: Paragraph,
  heading: Heading,
  accordion: Accordion,
  buttons: Buttons,
  card: Card,
  textEditor: TextEditor,
  divider: Divider,
  image: Image,
  quote: Quote,
  tabs: Tabs
};

interface BlockRouter {
  blocks: Blocks[],
  classNames?: string,
  width?: string
}

export const BlockRouter: React.FC<BlockRouter> = ({ blocks, classNames, width = "100%"}) => {
  return (
    <>
      {blocks &&
        blocks.map((block, i) => {
          const {blockType} = block;
          const BlockComponent = BlockMap[blockType];
          return( 
            <Box className={`block-wrap${classNames ? ' ' + classNames : ''}`} h="100%" w={{base: "100%", md: width}} key={i} >
              <BlockComponent  content={block} />
            </Box>
          );
        })}
    </>
  );
}

export default BlockRouter;