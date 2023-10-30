import { BoxProps, Text, Title, TitleOrder } from "@mantine/core";
import { Blockquote } from "@mantine/core";
import PLexicalMedia from "./PLexicalMedia";
import PLexicalParse, { SerializedLexicalNode } from "./PLexicalParse";

//TODO Typscript conditional based of tag value
type ElementTypes = "heading" | "paragraph" | "upload" | "quote";
type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Format = "" | "left" | "right" | "center";
interface BaseNode {
  children: SerializedLexicalNode[];
  indent: number;
  direction: "ltr" | "rtl";
  type: ElementTypes;
  tag?: Headings;
  value?: PLexicalMedia["content"]["value"];
  format: Format;
}
interface HeadingNode extends BaseNode {
  tag: Headings;
}
interface MediaNode extends BaseNode {
  value: PLexicalMedia["content"]["value"];
}
type ElementNode = BaseNode & HeadingNode & MediaNode;

export interface PLexical {
  [k: string]: unknown;
}

export type LexicalEditor = {
  root: {
    type: "root";
    format: string;
    indent: number;
    version: number;
    children: ElementNode[];
  };
};

export const PLexical: React.FC<PLexical> = ({ textEditor }) => {
  if (!textEditor || !textEditor.hasOwnProperty("root")) return null;
  const text: LexicalEditor = textEditor as LexicalEditor;

  const children = text?.root?.children || [];
  return children.map((element, i) => {
    const { type, indent, format } = element;
    const props: BoxProps = {};
    if (indent) {
      props.ml = indent + "rem";
    }
    if (format) {
      props.ta = format;
    }

    switch (type) {
      case "heading":
        const order = parseInt(element.tag.replace("h", "")) as TitleOrder;
        return (
          <Title key={i} {...props} order={order}>
            <PLexicalParse content={element.children} />
          </Title>
        );
      case "paragraph":
        return (
          <Text key={i} {...props}>
            <PLexicalParse content={element.children} />
          </Text>
        );
      case "upload":
        return <PLexicalMedia key={i} content={element} />;
      case "quote":
        props.my = "md";
        return (
          <Blockquote {...props}>
            <PLexicalParse content={element.children} />
          </Blockquote>
        );
      default:
        return (
          <Text key={i} {...props}>
            <PLexicalParse content={element.children} />
          </Text>
        );
    }
  });
};

export default PLexical;
