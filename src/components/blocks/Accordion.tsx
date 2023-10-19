import type { BlockAccordion } from "@/types/payload-types";
import { Accordion as MAccordion, Box, Title, SimpleGrid, Text } from "@mantine/core";
//! Need to update Editor Parse
// import PEditorParse from "./parts/PEditorParse";

interface Accordion {
  content: BlockAccordion
}

export const Accordion: React.FC<Accordion> = ({ content }) => {
  const { title, columns = "1", list } = content;
  //? Global Theme Definition ?//
  const themeGutters = 4;
  return (
    <Box className="block __list-accordion">
      {title && (
        <Title order={2}>
          {title}
        </Title>
      )}
      <MAccordion>
        <SimpleGrid cols={{base: 1, md: parseInt(columns)}} spacing="xl">
          {list && list.map((item, i) => (
            <MAccordion.Item key={i} value={`${i}`}>
              <MAccordion.Control>
                <Title order={3}>
                  { item.title }
                </Title>
              </MAccordion.Control>
              <MAccordion.Panel>
                 <Text>{JSON.stringify(item.textEditor)}</Text> 
              </MAccordion.Panel>
            </MAccordion.Item>
          ))}
        </SimpleGrid>
      </MAccordion>
    </Box>
  );
}

export default Accordion;