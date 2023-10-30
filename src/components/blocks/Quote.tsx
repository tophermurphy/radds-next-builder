import { Blockquote as MBlockquote } from "@mantine/core";
import { BlockQuote } from "@/types/payload-types";

interface Quote {
  content: BlockQuote;
}

export const Quote: React.FC<Quote> = ({ content }) => {
  const { text, source, color } = content;
  const quoteColor =
    typeof color === "string" || !color ? "primary" : color.name;
  return (
    <MBlockquote color={quoteColor} cite={source}>
      {text}
    </MBlockquote>
  );
};

export default Quote;