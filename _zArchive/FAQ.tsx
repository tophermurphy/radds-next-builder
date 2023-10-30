import { Box, Heading, Text } from "@chakra-ui/react";
import { Accordion, ListItemProps, AccordionProps } from "../src/components/blocks/Accordion";

export interface FAQsProps {
  max_per_category: number;
  title?: string;
  faqs: FAQProps[];
}

export type FAQProps = {
  faq: {
    category: string;
    questions: ListItemProps[];
  };
};

export const FAQ = ({ content }: { content: FAQsProps }) => {
  const { max_per_category = 0, title, faqs } = content;
  const faqList = faqs.map((item) => {
    const {
      faq: { category, questions },
    } = item;
    if (max_per_category > 0 && max_per_category < questions.length) {
      questions.length = max_per_category;
    }
    return {
      heading: category,
      list: questions,
    };
  });

  return (
    <div className="block __faq">
      {title && (
        <Text as="h2" textStyle="h2">
          {title}
        </Text>
      )}
      {faqList &&
        faqList.map((item, i) => (
          <Box key={`faq-${i}`} pt={4} className="__list">
            <Accordion h_level={3} content={item} />
          </Box>
        ))}
    </div>
  );
};
