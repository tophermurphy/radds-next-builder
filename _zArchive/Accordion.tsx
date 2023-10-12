import { As, Box, SimpleGrid, Text } from "@chakra-ui/react";
import {
  Accordion as CAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import PEditorParse from "./parts/PEditorParse";

// TODO Set Global: Column Gutters
export interface AccordionProps {
  heading?: string;
  columns?: string;
  list: ListItemProps[];
}

export interface ListItemProps {
  title: string;
  body: string;
}

export type HTypes = 1 | 2 | 3 | 4 | 5 | 6;

const themeGutters = 4;

// ? Working well, but maybe FlexRow component would be better?
// TODO: Visual styling cleanup

export const Accordion = ({ content, h_level = 2 }: { content: AccordionProps, h_level?: HTypes }) => {
  const { columns = 'c_1', heading, list } = content;
  const headerType = `h${h_level}`;
  const subHeadtype = `h${h_level + 1 > 6 ? 6: h_level + 1}`;
  const cols= parseFloat(columns.replace("c_", ""));
  return (
    <div className="block __list-accordion">
      {heading && (
        <Text as={headerType as As} textStyle={headerType}>
          {heading}
        </Text>
      )}
      <CAccordion allowToggle>
        <SimpleGrid columns={[1, 1, cols]} spacingX={themeGutters} >
          {list.map((item, i) => (
            <AccordionItem key={i} >
              <Text as={subHeadtype as As} >
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {item.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                <PEditorParse body={item.body} />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </SimpleGrid>
      </CAccordion>
    </div>
  );
};
