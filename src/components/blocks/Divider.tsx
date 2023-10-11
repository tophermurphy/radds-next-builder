import { Box, BoxProps } from "@chakra-ui/react";

interface DividerProps {
  divider_height: string;
  divider_color: Global.Color;
}

export const Divider = ({ content }: { content: DividerProps }) => {

  const {
    divider_height = 0,
    divider_color: { name: color },
  } = content;

  const bgColor = !color ? "transparent" : `${color}.main`;

  const boxProps: BoxProps = {
    height: `${divider_height}px`,
    backgroundColor: bgColor,
  };
  return <Box {...boxProps} />;
};
