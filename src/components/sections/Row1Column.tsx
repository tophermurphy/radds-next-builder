import type { SectionRow } from "@/types/payload-types";
import BlockRouter from "../BlockRouter";

export interface SectionRow1Column extends SectionRow {
  columns: "1";
}

export default function Row1Column({
  section,
}: {
  section: SectionRow1Column;
}) {
  return section.col_1_blocks && <BlockRouter blocks={section.col_1_blocks} />;
}
