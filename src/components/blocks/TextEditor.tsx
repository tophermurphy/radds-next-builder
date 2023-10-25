// import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import { BoxProps, Text, Title, TitleOrder } from "@mantine/core";
import PLexicalMedia from "./parts/PLexicalMedia";
import PLexicalParse, {
  SerializedLexicalNode,
} from "./parts/PLexicalParse";

//TODO Typscript conditional based of tag value
type ElementTypes = "heading" | "paragraph" | "upload";
type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Format = "" | "left" | "right" | "center";
interface BaseNode {
  children: SerializedLexicalNode[];
  indent: number;
  direction: "ltr" | "rtl";
  type: ElementTypes;
  tag?: Headings;
  value?: PLexicalMedia["content"]["value"];
  format: Format
};
interface HeadingNode extends BaseNode {
    tag: Headings
}
interface MediaNode extends BaseNode {
    value: PLexicalMedia["content"]["value"]
}
type ElementNode = BaseNode & HeadingNode & MediaNode
export interface TextEditor {
  content: {
    textEditor: {
      root: {
        type: "root";
        format: string;
        indent: number;
        version: number;
        children: ElementNode[];
      };
    };
  };
}

export const TextEditor: React.FC<TextEditor> = ({ content }) => {
  const {
    textEditor: {
      root: { children },
    },
  } = content;

  return children.map((element, i) => {
    const { type, indent, format } = element;
    const props: BoxProps = {}
    if( indent ){
      props.ml = indent + 'rem'
    }
    if( format ){
      props.ta = format
    }

    switch (type) {
      case "heading":
        const order = parseInt(element.tag.replace("h", "")) as TitleOrder;
        return (
          <Title key={i} {...props} order={order}>
            <PLexicalParse content={element.children} />
          </Title>
        )
        case "paragraph": 
            return  <Text key={i} {...props} ><PLexicalParse content={element.children} /></Text>
        case "upload": 
            return <PLexicalMedia key={i} content={element} />
        default:
            return  <Text key={i} {...props} ><PLexicalParse content={element.children} /></Text>
    }
  });
};

export default TextEditor;
