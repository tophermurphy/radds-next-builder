import { Box } from "@mantine/core";
import type { SectionSection } from "@/types/payload-types";
import BlockRouter from "../BlockRouter";

export default function Columns({ section }: { section: SectionSection }) {
  return (
    <Box className="section-section">
      <BlockRouter blocks={section.blocks} classNames="__section" />
    </Box>
  );
}
