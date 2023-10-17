import { Box, BoxProps, CssVarsProp } from "@mantine/core";

import classes from "./FlexRow.module.css";

import { CSSProperties } from "@mantine/core";

//TODO clean up the Typescript
// ? allow for gutter size prop updates?

export const AlignTypes = {
  top: "flex-start",
  bottom: "flex-end",
  center: "center",
  stretch: "stretch",
} as const;

export interface FlexRowProps extends React.PropsWithChildren, BoxProps {
  gutterX?: string;
  gutterY?: string;
  justify?: string;
  align?: keyof typeof AlignTypes;
  smColumns?: boolean;
  wrap?: boolean;
}

export const FlexRow = ({
  gutterX,
  gutterY,
  justify = "center",
  align = "top",
  smColumns = false,
  wrap = true,
  children,
  className = "",
  ...boxProps
}: FlexRowProps) => {
  let styles: CSSProperties = {};
  styles.justifyContent = justify;

  return (
    <Box
      {...boxProps}
      //@ts-ignore
      className={[
        className,
        classes["flex-row"],
        smColumns ? classes["__sm-cols"] : "",
        justify === "stretch" ? classes["__stretch-cols"] : "",
      ]}
      style={styles}
    >
      {children}
    </Box>
  );
};

export default FlexRow;
