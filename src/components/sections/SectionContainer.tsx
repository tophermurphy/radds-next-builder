import type { SectionOptions } from "@/types/payload-types";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Container, ContainerProps } from "@mantine/core";

export default function SectionContainer({
  sectionOptions,
  id,
  children,
}: {
  sectionOptions: SectionOptions;
  id: string;
  children: ReactJSXElement;
}) {

  //TODO default padding

  const { width, padding, variant, anchor, bg_color } = sectionOptions;
  const padProps = padding?.split("_") || [];
  let wrapProps: ContainerProps = {
    id: anchor || id,
    pt: padProps.includes("top") ? "md" : 0,
    pb: padProps.includes("bottom") ? "md" : 0,
  };

  const wrapColor =
    bg_color && typeof bg_color !== "string" && bg_color.hasOwnProperty("color")
      ? bg_color.color
      : "none";

  const Component = width === "container-bleed" ? Box : Container;
  return (
    <Box className="section_wrap" bg={wrapColor}>
      <Component className={variant || ""} {...wrapProps}>
        {children}
      </Component>
    </Box>
  );
}
