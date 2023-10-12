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
    <div>
      <h3>Row 2 Col</h3>

      {section.column_1 && (
        <div className="">
            <h4>column 1</h4>
          <BlockRouter blocks={section.column_1} />
        </div>
      )}

      {section.column_2 && (
        <div className="">
            <h2>Column 2</h2>
          <BlockRouter blocks={section.column_2} />
        </div>
      )}
    </div>
  );
}
