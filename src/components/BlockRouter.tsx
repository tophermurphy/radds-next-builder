import type {
  BlockAccordion,
  BlockButtons,
  BlockCard,
  BlockHeading,
  BlockParagraph,
  BlockTextEditor,
} from "@/types/payload-types";

import { Box } from "@chakra-ui/react";

import Heading from "./blocks/Heading";
import Paragraph from "./blocks/Paragraph";
import Accordion from "./blocks/Accordion";
import Buttons from "./blocks/Buttons";
import Card from "./blocks/Card";

export type Blocks =
  | BlockHeading
  | BlockParagraph
  | BlockAccordion
  | BlockCard
  | BlockButtons
  | BlockTextEditor;

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
  card: Card
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
          // const Component = BlockComponent.component;
          return( 
            <Box className={`block-wrap${classNames ? ' ' + classNames : ''}`} width={["100%", width]} key={i} >
              <BlockComponent  content={block} />
            </Box>
          );
        })}
    </>
  );
}

export default BlockRouter;

/**
 * Sets the Component Dynamically
 * Values are mapped via ./block/index.tsx
 * Wraps with BlockContainer if specified in block/index
 */

// import { Blocks } from "./blocks";
// import BlockContainer from "./BlockContainer";

// // TODO Need to type Block
// type Block = any;

// export default function BlockRouter({ content }: { content: Global.Block[] }) {
//   return (
//     <>
//       { content && content.length &&
//         content.map((block, i) => {
//           const { options_block, ...content } = block;
//           const Block = Blocks[block.__component];
//           const BlockComponent: Block = Block.component;
//           const blockName = content.__component;
//           const blockId = options_block?.anchor ?? `${blockName}-${i}`;

//           if (Block.useOptions ) {
//             return (
//               <section key={i} id={blockId} className={blockName}>
//                 <BlockContainer options={options_block} index={i}>
//                   <BlockComponent options={options_block} content={content} />
//                 </BlockContainer>
//               </section>
//             );
//           } else {
//             return (
//               <section key={i} className={blockName} id={blockId}>
//                 <BlockComponent
//                   key={i}
//                   options={options_block}
//                   content={content}
//                 />
//               </section>
//             );
//           }
//         })}
//     </>
//   );
// }
