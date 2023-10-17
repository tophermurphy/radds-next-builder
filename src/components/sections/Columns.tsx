import type { ColumnOptions, SectionColumns } from "@/types/payload-types";
import BlockRouter from "../BlockRouter";

import FlexRow from "../blocks/parts/FlexRow";

//TODO ? Default justify

export default function Columns({ section }: { section: SectionColumns }) {
  const { columns = "2", justify = "center" } = section.column_options || {};

  const blockWidth = parseFloat((100 / parseInt(columns)).toFixed(6)) + "%";
  return (
    section.blocks && (
      <FlexRow className="section-columns" justify={justify}>
        <BlockRouter
          blocks={section.blocks}
          width={blockWidth}
          classNames="__col"
        />
      </FlexRow>
    )
  );
}
