import type { BlockCard } from "@/types/payload-types";

import {
  Card as MCard,
  CardProps,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
} from "@mantine/core";

import PEditorParse from "./parts/PEditorParse";

//TODO Better styling for cards

interface Card {
  content: BlockCard & CardProps;
}

export const Card: React.FC<Card> = ({ content }) => {
  const { title, subtitle, image, textEditor, card_color } = content || {};

  let parsedText: string = "";

  if (textEditor) {
    try {
      parsedText = JSON.parse(textEditor as any);
    } catch {
      parsedText = "";
    }
  }

  return (
    <MCard shadow="sm" padding="lg" radius="md" withBorder>
      {image && image.hasOwnProperty("url") && (
        <MCard.Section>
          <Image
            height={60}
            fit="cover"
            //@ts-ignore
            src={image.url}
            //@ts-ignore
            alt={image.alt || ""}
          />
        </MCard.Section>
      )}
      {title && (
        <Title order={3} size="h4">
          {title}
        </Title>
      )}
      {subtitle && (
        <Title order={4} size="h5">
          {subtitle}
        </Title>
      )}
      {parsedText && <Text>{parsedText}</Text>}
    </MCard>
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
