import type { BlockTextEditor } from "@/types/payload-types";
// import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import PLexicalParse, {
  SerializedLexicalEditorState,
  SerializedLexicalNode,
} from "./parts/PLexicalParse";
import PLexicalMedia from "./parts/PLexicalMedia";
import { Text, Title, TitleOrder } from "@mantine/core";
import { ParagraphNode } from "lexical";

//TODO indent

//TODO Typscript conditional based of tag value

type ElementTypes = "heading" | "paragraph" | "upload";

type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface BaseNode {
  children: SerializedLexicalNode[];
  indent: number;
  direction: "ltr" | "rtl";
  type: ElementTypes;
  tag?: Headings;
  value?: PLexicalMedia["value"]
};

interface HeadingNode extends BaseNode {
    tag: Headings
}

interface MediaNode extends BaseNode {
    value: PLexicalMedia["value"]
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

//heading
//pararaph
//image

export const TextEditor: React.FC<TextEditor> = ({ content }) => {
  const {
    textEditor: {
      root: { children },
    },
  } = content;

  return children.map((element) => {
    const { type } = element;

    switch (type) {
      case "heading":
        const order = parseInt(element.tag.replace("h", "")) as TitleOrder;
        return (
          <Title order={order}>
            <PLexicalParse content={element.children} />
          </Title>
        )
        case "paragraph": 
            return  <Text><PLexicalParse content={element.children} /></Text>
        case "upload": 
            return <PLexicalMedia value={element.value} />
        default:
            return  <Text><PLexicalParse content={element.children} /></Text>
    }
  });
};

export default TextEditor;
