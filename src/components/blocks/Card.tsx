import type { BlockCard } from "@/types/payload-types";
import PLexical from "./parts/PLexical.tsx";

import {
  Card as MCard,
  CardProps,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  Box,
} from "@mantine/core";


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
  const prefix = process.env.NEXT_PUBLIC_MEDIAPATH || 'media/';

  return (
    <MCard shadow="sm" padding="lg" radius="md" withBorder>
      {image && image.hasOwnProperty("url") && (
        <MCard.Section>
          <Image
            height={60}
            fit="cover"
            //@ts-ignore
            src={prefix + image.filename}
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
      {textEditor &&
        <Box>
          <PLexical textEditor={textEditor} />
        </Box>
      }
    </MCard>
  );
};

export default Card;
