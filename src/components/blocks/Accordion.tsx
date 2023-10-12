import type { BlockAccordion } from "@/types/payload-types";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import {
  Accordion as CAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
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
        <Heading as="h2" textStyle="h2">
          {title}
        </Heading>
      )}
      <CAccordion allowToggle>
        <SimpleGrid columns={[1, 1, parseInt(columns)]} spacingX={themeGutters}>
          {list && list.map((item, i) => (
            <AccordionItem key={i}>
              <Text as="h3" textStyle="h3">
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {item.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                { JSON.stringify(item.textEditor) }
              </AccordionPanel>
            </AccordionItem>
          ))}
        </SimpleGrid>
      </CAccordion>
    </Box>
  );
}

export default Accordion;