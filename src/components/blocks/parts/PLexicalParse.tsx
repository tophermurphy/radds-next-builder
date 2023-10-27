//TODO: Cleanup

import { Box, BoxProps, Button } from "@mantine/core";
import Link from "next/link";
import PButton from "./PButton";
import { ButtonPart } from "@/types/payload-types";

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
        if (el.style) {
          props.style = {
            textDecoration: el.style,
          };
        }
        Component = (
          <Box {...props} component={componentName as any}>
            {text}
          </Box>
        );
      } else {
        const componentName = el.component;
        let props: BoxProps = {};
        if (el.style) {
          props.style = {
            textDecoration: el.style,
          };
        }
        Component = (
          <Box {...props} component={componentName as any}>
            {Component}
          </Box>
        );
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
    switch (true) {
      case fields && fields.button === true:
        const internalText =
          NodeChildren?.reduce((str, item) => {
            return (str += item?.text ?? "");
          }, "") || "";

          //! Need to set external link
        const ButtonProps: ButtonPart = {
          label: internalText,
          link_type: fields?.linkType === "internal" ? "page" : "url",
          style: fields?.button_options?.style ?? "primary",
          //? this may break if undefined in CMS???
          color: fields?.button_options?.color,
          url_link: fields?.url ?? "/",
          //! Need to make sure you can only select pages
          page_link: fields?.doc?.value || undefined,
          newTab: fields?.newTab
        };
        return <PButton size="sm" button={ButtonProps} />;

      case fields && fields.button === false && fields.linkType === "internal":
        return (
          <Link href={fields?.doc?.value?.slug ?? "/"}>
            {SetComp({ format, text, type, fields })}
          </Link>
        );

      case fields && fields.button === false && fields.linkType === "custom":
        const Component = "a";
        return (
          <Component
            href={fields?.url ?? "/"}
            target={fields?.newTab ? "_blank" : "_self"}
          >
            {SetComp({ format, text, type, fields })}
          </Component>
        );

      default:
        return SetComp({ format, text, type, fields });
    }
  } else if (type === "text") {
    return SetComp({ format, text, type, fields });
  } else return null;
};

export const PLexicalParse = ({ content }: PLexicalParse) => {
  if (!content.length) return "";
  return (
    content &&
    content.map((item, i) => {
      return <CompWrap props={item} key={i} />;
    })
  );
};

export default PLexicalParse;
