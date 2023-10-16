import type { BlockCard } from "@/types/payload-types";

import FlexRow, { AlignTypes, FlexRowProps } from "./parts/FlexRow";
import { parseStrapiColumn } from "@/lib/utils";
import {
  Card as CCard,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import PEditorParse from "./parts/PEditorParse";

//TODO Better styling for cards

interface Card {
    content: BlockCard
};

export const Card: React.FC<Card> = ({content}) => {
  const prefix = process.env.IMAGE_URL || "localhost:2112";
  return (
    <div style={{background: 'lightgray'}}>hello</div>
  );
};

export default Card;


// const variant = borderless ? "elevated" : "outline";
// const { title, subtitle, body, link, external } = card;
// const image = card.image ?? false;
// const color = card.bg_color
//   ? `${card.bg_color.name}.100`
//   : "transparent";

// return (
//   <Box key={`card-${i}`} w={colWidth}>
//     <CCard bg={color} variant="outline">
//       <CardBody>
//         {image && (
//           <Image
//             mx="auto"
//             src={prefix + image.url}
//             alt={image.alternativeText}
//           />
//         )}
//         <Stack spacing={3}>
//           {title && (
//             <Text as="h3" textStyle="h3">
//               {title}
//             </Text>
//           )}
//           {subtitle && (
//             <Text as="h4" textStyle="h4">
//               {subtitle}
//             </Text>
//           )}
//           {body && <PEditorParse body={body} />}
//         </Stack>
//       </CardBody>
//     </CCard>
//   </Box>