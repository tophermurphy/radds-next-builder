import global from "@/lib/global";
import { Box, useTheme, BoxProps } from "@chakra-ui/react";

//TODO Responsive Gutters

export const JustifyTypes = {
  left: "flex-start",
  right: "flex-end",
  center: "center",
  stretch: "stretch",
  around: "space-around",
  between: "space-between",
  evenly: "space-evenly",
} as const;

export const AlignTypes = {
  top: "flex-start",
  bottom: "flex-end",
  center: "center",
  stretch: "stretch",
} as const;

export interface FlexRowProps extends React.PropsWithChildren, BoxProps  {
  gutterX?: string;
  gutterY?: string;
  justify?: string;
  align?: keyof typeof AlignTypes;
  smColumns?: boolean;
  wrap?: boolean;
}

export const FlexRow = ({
  gutterX = global.gutterX,
  gutterY = global.gutterY,
  justify = "center",
  align = "top",
  smColumns = false,
  wrap = true,
  children,
  ...boxProps
}: FlexRowProps) => {
  const theme = useTheme();
  const { breakpoints: bp } = theme;
  const canwrap = wrap === true ? "wrap" : "nowrap";
  const styles = {
    display: "flex",
    flexWrap: canwrap,
    flexDirection: smColumns ? "row" : "column",
    justifyContent: justify || 'center',
    alignItems: AlignTypes[align],
    marginTop: `calc(-1 * ${gutterY})`,
    marginRight: `calc(-.5 * ${gutterX})`,
    marginLeft: `calc(-.5 * ${gutterX})`,
    maxHeight: '100%',
    "& > *": {
      paddingTop: gutterY,
      paddingRight: `calc(${gutterX} * .5)`,
      paddingLeft: `calc(${gutterX} * .5)`,
      maxWidth: "100%",
      maxHeight: "100%",
      flexShrink: "0",
      flexBasis: "auto",
      flexGrow: justify === "stretch" ? "1" : "0",
      minWidth: smColumns ? "0" : "100%",
    },
    [`@media(min-width: ${bp.md})`]: {
      flexDirection: "row",
      flexWrap: canwrap,
      "& > *": {
        minWidth: "0",
      },
    },
  };

  return (
    <Box {...boxProps} className="flex-row" sx={styles}>
      {children}
    </Box>
  );
};

export default FlexRow;
