import Section from "./sections/Section";
import SectionContainer from "./sections/SectionContainer";
import Columns from "./sections/Columns";
import Row1Column, { SectionRow1Column } from "./sections/Row1Column";
import Row2Column, { SectionRow2Column } from "./sections/Row2Column";

import type {
  SectionSection,
  SectionRow,
  SectionColumns,
  SectionOptions,
} from "@/types/payload-types";

export type Sections = (SectionRow | SectionColumns | SectionSection)[] | undefined;

export default function SectionRouter({ sections }: { sections: Sections }) {
  const defaultSectOpts: SectionOptions = {
    width: "container",
    padding: "top_bottom",
  };

  return sections?.map((section, i) => {
    const { blockType } = section;
    switch (true) {
      case blockType === "section":
        return (
          <SectionContainer
            sectionOptions={section.section_options || defaultSectOpts}
            id={`section-${i}`}
            key={i}
          >
            <Section section={section as SectionSection} />
          </SectionContainer>
        );
      case blockType === "columns":
        return (
          <SectionContainer
            sectionOptions={section.section_options || defaultSectOpts}
            id={`section-${i}`}
            key={i}
          >
            <Columns section={section as SectionColumns} />
          </SectionContainer>
        );
      case blockType === "row" && section.columns === "1":
        return (
          <SectionContainer
            sectionOptions={section.section_options || defaultSectOpts}
            id={`section-${i}`}
            key={i}
          >
            <Row1Column section={section as SectionRow1Column} />
          </SectionContainer>
        );
      case blockType === "row" && section.columns === "2":
        return (
          <SectionContainer
            sectionOptions={section.section_options || defaultSectOpts}
            id={`section-${i}`}
            key={i}
          >
            <Row2Column section={section as SectionRow2Column} />
          </SectionContainer>
        );
    }
  });
}
