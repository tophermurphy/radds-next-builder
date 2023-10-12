import type { SectionOptions } from "@/types/payload-types";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export default function SectionWrap({
  sectionOptions,
  id,
  children,
}: {
  sectionOptions: SectionOptions;
  id: string;
  children: ReactJSXElement;
}) {
  const {
    width,
    padding,
    variant,
    anchor,
  } = sectionOptions;
  const sectionId = anchor || id;
  return (
    <section className={`${variant} ${padding} ${width}`} id={sectionId}>
      {children}
    </section>
  );
}
