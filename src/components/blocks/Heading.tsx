import { Box } from "@chakra-ui/react";
import type { BlockHeading } from "@/types/payload-types";

interface Heading {
  content: BlockHeading;
}

export const Heading : React.FC<Heading> = ({ content }) => {
  const { size = "h2", heading } = content;
  return (
    <Box as={size} textStyle={size} className="block __title-header">
      {heading}
    </Box>
  );
};

export default Heading;