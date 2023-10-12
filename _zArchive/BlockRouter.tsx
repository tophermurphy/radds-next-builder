/**
 * Sets the Component Dynamically 
 * Values are mapped via ./block/index.tsx 
 * Wraps with BlockContainer if specified in block/index
 */

import { Blocks } from "./blocks";
import BlockContainer from "./BlockContainer";

// TODO Need to type Block
type Block = any;

export default function BlockRouter({ content }: { content: Global.Block[] }) {
  return (
    <>
      { content && content.length &&
        content.map((block, i) => {
          const { options_block, ...content } = block;
          const Block = Blocks[block.__component];
          const BlockComponent: Block = Block.component;
          const blockName = content.__component;
          const blockId = options_block?.anchor ?? `${blockName}-${i}`;

          if (Block.useOptions ) {
            return (
              <section key={i} id={blockId} className={blockName}>
                <BlockContainer options={options_block} index={i}>
                  <BlockComponent options={options_block} content={content} />
                </BlockContainer>
              </section>
            );
          } else {
            return (
              <section key={i} className={blockName} id={blockId}>
                <BlockComponent
                  key={i}
                  options={options_block}
                  content={content}
                />
              </section>
            );
          }
        })}
    </>
  );
}
