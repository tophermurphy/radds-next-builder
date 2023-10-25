//TODO: Link functionality
//TODO: Cleanup

import Link from "next/link";
import { Box, BoxProps } from "@mantine/core";

export type SerializedLexicalEditorState = {
  root: {
    type: string;
    format: string;
    indent: number;
    version: number;
    children: SerializedLexicalNode[];
  };
};

export type SerializedLexicalNode = {
  children?: SerializedLexicalNode[];
  direction: string;
  format: number;
  indent?: string | number;
  type: string;
  version: number;
  style?: string;
  mode?: string;
  text?: string;
  [other: string]: any;
};

export interface PLexicalParse {
  content: SerializedLexicalNode[];
}
// Text node formatting
export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;
export const IS_HIGHLIGHT = 1 << 7;

interface NodeProps {
  format: number;
  text?: string;
  type: string;
  fields?: {
    [key: string]: any;
  };
  children?: NodeProps[];
}

type Node = {
  format: number;
  text?: string;
  type: string;
  fields?: {
    [key: string]: any;
  };
};

const WrapObject = [  
  { test: IS_SUPERSCRIPT, component: "sup" },
  { test: IS_SUBSCRIPT, component: "sub" },
  { test: IS_CODE, component: "code" },
  { test: IS_UNDERLINE, component: "span", style: "underline" },
  { test: IS_STRIKETHROUGH, component: "span", style: "line-through" },
  { test: IS_ITALIC, component: "em" },
  { test: IS_BOLD, component: "strong" },
];

const SetComp = ({
  children,
  format,
  text,
  fields,
}: React.PropsWithChildren<Node>) => {
  let Component: any;
  WrapObject.forEach((el) => {
    if (format & el.test) {
      if (!Component && el.component) {
        const componentName = el.component;
        let props: BoxProps = {};
        if( el.style ){
          props.style = {
            textDecoration: el.style
          }
        }
        Component = <Box {...props} component={componentName as any}>{text}</Box>;
      } else {
        const componentName = el.component;
        let props: BoxProps = {};
        if( el.style ){
          props.style = {
            textDecoration: el.style
          }
        }
        Component = <Box {...props} component={componentName as any}>{Component}</Box>;
      }
    } else {
      return <>{text}</>;
    }
  });
  return Component || <>{text}</>;
};

const CompWrap = ({
  children: ReactChildren,
  props,
}: React.PropsWithChildren<{ props: NodeProps }>) => {
  const { format, text, type, fields, children: NodeChildren } = props;
  if (type === "linebreak") {
    const Component = "br";
    return <Component />;
  } else if (type === "link") {
    return <Link href="/">{NodeChildren ? NodeChildren[0].text : ""}</Link>;
  } else if (type === "text") {
    return SetComp({ format, text, type, fields });
  } else return null;
};

export const PLexicalParse = ({ content }: PLexicalParse) => {
  if (!content.length) return "";
  return (
    content &&
    content.map((item) => {
      return CompWrap({ props: item });
    })
  );
};

export default PLexicalParse;
