import { Title, TitleOrder, TitleProps } from "@mantine/core";

import type { BlockHeading } from "@/types/payload-types";


interface Heading  {
  content: BlockHeading & TitleProps;
}

export const Heading : React.FC<Heading> = ({ content }) => {
  const { size = "h2", heading } = content || {};
  const titleSize = parseInt(size.replace('h', '')) as TitleOrder;
  return (
    <Title order={titleSize} className="block __title-header">
      {heading}
    </Title>
  );
};

export default Heading;