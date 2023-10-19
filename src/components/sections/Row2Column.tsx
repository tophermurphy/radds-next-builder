import type { SectionRow } from "@/types/payload-types";
import BlockRouter from "../BlockRouter";
import FlexRow from "../blocks/parts/FlexRow";
import { Box } from "@mantine/core";

export interface SectionRow2Column extends SectionRow {
  columns: "2";
}

export default function Row2Column({
  section,
}: {
  section: SectionRow2Column;
}) {
  const cols = section?.layout?.split("_") || ["6", "6"];

  const parsedCols = cols.map((el) => ((parseInt(el) / 12) * 100).toFixed(6));

  return (
    <FlexRow className="section_1_col">
      {section.col_1_blocks && (
        <Box w={parsedCols[0] + "%"} className="__col-1">
          <BlockRouter blocks={section.col_1_blocks} />
        </Box>
      )}
      {section.col_2_blocks && (
        <Box w={parsedCols[1] + "%"} className="__col-2">
          <BlockRouter blocks={section.col_2_blocks} />
        </Box>
      )}
    </FlexRow>
  );
}
