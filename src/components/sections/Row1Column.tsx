import type { SectionRow } from "@/types/payload-types";
import BlockRouter from "../BlockRouter";
import { Box } from "@mantine/core";

export interface SectionRow1Column extends SectionRow {
  columns: "1";
}

export default function Row1Column({
  section,
}: {
  section: SectionRow1Column;
}) {
  return (
    section.col_1_blocks && (
      <Box className="section-row-1-col">
        <BlockRouter blocks={section.col_1_blocks} />
      </Box>
    )
  );
}
