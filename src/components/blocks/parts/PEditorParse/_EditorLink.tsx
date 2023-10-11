import Link from "next/link";
import PButton, { BtnProps, ButtonStyles, LinkTargets } from "../PButton";
import BlockError from "@/components/BlockError";

// Todo Set default Link color in Theme Options

interface LinkMarkProps extends Strapi.Mark {
  attrs: {
    className: ButtonStyles;
    href: string;
    external: boolean;
    large: boolean;
  };
}

export interface EditorLinkProps {
  node: Strapi.EditorNode & {
    marks: LinkMarkProps[];
    text: string;
  };
}

export const EditorLink = ({ node }: any) => {
  const linkMark = node.marks.find((i: any) => i.type === "link");
  if (!linkMark) return;
  const { className, href, external, large } = linkMark.attrs;
  let linkProps = { className: "__p-editor-link", href, target: '_parent' };
  linkProps.target = external ? '_blank' : '_parent';
    if (className === "Plain") {
        return <Link {...linkProps}>{node.text}</Link>;
    }
    else {
        let props: BtnProps = {
            block: false,
            label: node.text,
            link: href,
            size: large ? "large" : "medium",
            target: linkProps.target as LinkTargets,
            style: className || "Primary"
            
        }
       return <PButton content={props} />;
    }
};

export default EditorLink;
