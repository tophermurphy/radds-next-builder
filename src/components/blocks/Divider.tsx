import { Box, BoxProps } from "@mantine/core";

import { BlockDivider } from "@/types/payload-types";

interface Divider {
  content: BlockDivider
}


export const Divider: React.FC<Divider> = ({ content }) => {
  const { height, color } = content;
  const bgColor = !color || typeof color === "string" ? "#fff" : color.name;

  const boxProps: BoxProps = {
    h: height,
    bg: bgColor,
  };
  return <Box {...boxProps} />;
};

export default Divider;