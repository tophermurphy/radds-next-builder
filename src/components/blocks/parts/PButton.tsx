import { Button, ButtonProps  } from "@chakra-ui/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SvgIconComponent } from "@material-ui/icons";

export type ButtonSizes = "large" | "medium" | "xLarge";
export type ButtonStyles = "Plain" | "Primary" | "PrimaryAlt" | "Secondary" | "SecondaryAlt";
export type LinkTargets = "_self" | "_blank" | "_parent" | "_top";

// TODO Parse the href/link before component
export interface BtnProps {
  block: boolean;
  icon?: string | null;
  label?: string;
  link: string;
  size: ButtonSizes;
  target: LinkTargets;
  style: ButtonStyles;
}

const styleMap = {
  Plain: {
    colorScheme: "primary",
    variant: "solid",
  },
  Primary: {
    colorScheme: "primary",
    variant: "solid",
  },
  Secondary: {
    colorScheme: "secondary",
    variant: "solid",
  },
  PrimaryAlt: {
    colorScheme: "primary",
    variant: "outline",
  },
  SecondaryAlt: {
    colorScheme: "secondary",
    variant: "outline",
  },
};

const sizeMap = {
  xLarge: {
    size: "lg",
  },
  large: {
    size: "md",
  },
  medium: {
    size: "sm",
  },
};

const BlankIcon = () => <div></div>;

// Todo Figure out fallback for icon or don't set;
// Todo Add Icon Selector on Strapi End

const setIcon = (name: string) => {
  return dynamic(()=> 
    import('@material-ui/icons').then((mod) => mod[name] as SvgIconComponent)
  )
  // const ImportFunc = import("@material-ui/icons").then((mod) => {
  //   return mod.Search;
  // });

  // const DynamicComp = dynamic(ImportFunc, {
  //   loading: BlankIcon,
  // });
  // return DynamicComp;
};

export const PButton = ({ content }: { content: BtnProps }) => {
  let props: ButtonProps = {
    ...styleMap[content.style],
    ...sizeMap[content.size],
  };
  if (content.block) props.width = "100%";
  if (content.icon) {
    const Icon = setIcon(content.icon);
    props.leftIcon = <Icon />;
  }
  return (
    <Button {...props} className="__p-button">
      <Link target={content.target || "_blank"} href={content.link}>
        {content.label} 
      </Link>
    </Button>
  );
};

export default PButton;
