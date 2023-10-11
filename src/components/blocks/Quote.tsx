import { Box, BoxProps } from "@chakra-ui/react";

//TODO bottom padding or margin is off
export interface QuoteProps {
  quote_copy: string;
  quote_source?: string;
  bg_color: Global.Color;
}

export const Quote = ({ content }: { content: QuoteProps }) => {
  const bgColor =
    content.bg_color.name ?? "transparent";
  let props: BoxProps = {
    bg: bgColor,
    fontStyle: "italic",
    fontSize: "lg",
    borderLeft: "solid 1px",
    pl: 4,
    py: 2,
  };
  let captionProps: BoxProps = {
    textStyle: "caption",
    mt: 4,
    textAlign: "right",
  };
  if (bgColor !== "transparent") {
    (props.bg = bgColor + ".100"),
      (props.borderLeftColor = bgColor + ".500"),
      (props.pr = 2);
  }
  const captionSx = {
    "&::before": {
      content: "'- '",
    },
  };
  return (
    <Box as="figure" className="block __quote">
      <Box as="blockquote" {...props}>
        {content.quote_copy}
      </Box>
      {content.quote_source && (
        <Box as="figcaption" sx={captionSx} {...captionProps}>
          {content.quote_source}
        </Box>
      )}
    </Box>
  );
};
