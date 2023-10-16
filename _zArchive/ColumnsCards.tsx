import FlexRow, { AlignTypes, FlexRowProps } from "./parts/FlexRow";
import { parseStrapiColumn } from "@/lib/utils";
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Text, Box, Button } from '@chakra-ui/react'
import PEditorParse from "./parts/PEditorParse";

//TODO Better styling for cards

export interface ColumnsCardsProps {
    options_columns: Strapi.Columns;
    borderless: boolean;
    cards: CardProps[];
}

export interface CardProps {
    title?: string;
    subtitle?: string;
    body?: string;
    link?: string;
    external?: boolean;
    image: Global.Image;
    bg_color: Global.Color;
}

export const ColumnsCards = ({content: {options_columns, borderless, cards}}: {content: ColumnsCardsProps}) => {
    const { justify, columns } = options_columns;
    const colWidth = parseStrapiColumn(columns);
    const prefix = process.env.IMAGE_URL || 'localhost:1337';
    return(
        <FlexRow justify={justify} >
        { cards &&
        cards.map( (card, i) => {
            const variant = borderless ? "elevated" : "outline";            
            const { title, subtitle, body, link, external } = card;
            const image = card.image ?? false;
            const color = card.bg_color ? `${card.bg_color.name}.100` : 'transparent';

            return (
                <Box key={`card-${i}`} w={colWidth}>
                <Card bg={color} variant="outline" >
                    <CardBody>
                        { image &&
                            <Image mx="auto" src={prefix + image.url} alt={image.alternativeText}  />
                        }
                        <Stack spacing={3}>
                            {
                                title &&
                                <Text as="h3" textStyle="h3">{title}</Text>
                            }
                            {
                                subtitle &&
                                <Text as="h4" textStyle="h4">{subtitle}</Text>
                            }{
                                body &&
                                <PEditorParse body={body} />
                            }
                        </Stack>
                    </CardBody>
                </Card>
                </Box>
            )
        }) }
        </FlexRow>
    )
}