import type {
  BlockAccordion,
  BlockButtons,
  BlockCard,
  BlockHeading,
  BlockParagraph,
  BlockTextEditor,
} from "@/types/payload-types";

import Heading from "./blocks/Heading";
import Paragraph from "./blocks/Paragraph";
import Accordion from "./blocks/Accordion";
import Buttons from "./blocks/Buttons";

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
};

export const BlockRouter = ({ blocks }: { blocks: Blocks[] }) => {
  return (
    <>
      {blocks &&
        blocks.map((block, i) => {
          const {blockType} = block;
          const BlockComponent = BlockMap[blockType];
          // const Component = BlockComponent.component;
          return( <BlockComponent key={i} content={block} />);
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
