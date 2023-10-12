import SectionWrap from "./sections/SectionWrap";
import Columns from "./sections/Columns";
import Row1Column, { SectionRow1Column } from "./sections/Row1Column";
import Row2Column, { SectionRow2Column } from "./sections/Row2Column";

import type {
  SectionRow,
  SectionColumns,
  SectionOptions,
} from "@/types/payload-types";

export type Sections = (SectionRow | SectionColumns)[] | undefined;

export default function SectionRouter({ sections }: { sections: Sections }) {
  const defaultSectOpts: SectionOptions = {
    width: "container",
    padding: "py-block",
  };

  return sections?.map((section, i) => {
    const { blockType } = section;
    switch (true) {
      case blockType === "columns":
        return (
          <SectionWrap
            sectionOptions={section.section_options || defaultSectOpts}
            id={`section-${i}`}
            key={i}
          >
            <Columns section={section as SectionColumns} />
          </SectionWrap>
        );
      case blockType === "row" && section.columns === "1":
        return (
          <SectionWrap
            sectionOptions={section.section_options || defaultSectOpts}
            id={`section-${i}`}
            key={i}
          >
            <Row1Column section={section as SectionRow1Column} />
          </SectionWrap>
        );
      case blockType === "row" && section.columns === "2":
        return (
          <SectionWrap
            sectionOptions={section.section_options || defaultSectOpts}
            id={`section-${i}`}
            key={i}
          >
            <Row2Column section={section as SectionRow2Column} />
          </SectionWrap>
        );
    }
  });
}
