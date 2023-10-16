import type { SectionRow } from "@/types/payload-types";
import BlockRouter from "../BlockRouter";

export interface SectionRow2Column extends SectionRow {
  columns: "2";
}

export default function Row2Column({
  section,
}: {
  section: SectionRow2Column;
}) {
  return (
    <div style={{color: 'green'}}>
      <h3>Row 2 Col</h3>

      {section.col_1_blocks && (
        <div className="">
            <h4>column 1</h4>
          <BlockRouter blocks={section.col_1_blocks} />
        </div>
      )}

      {section.col_2_blocks && (
        <div className="">
            <h2 style={{color: 'green'}}>Column 2</h2>
          <BlockRouter blocks={section.col_2_blocks} />
        </div>
      )}
    </div>
  );
}
