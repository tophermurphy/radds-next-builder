import type { ButtonPart } from "@/types/payload-types";
import { Button, ButtonProps  } from "@chakra-ui/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SvgIconComponent } from "@material-ui/icons";

// Todo Later Icons
// const BlankIcon = () => <div></div>;

// const setIcon = (name: string) => {
//   return dynamic(()=> 
//     import('@material-ui/icons').then((mod) => mod[name] as SvgIconComponent)
//   )
//   // const ImportFunc = import("@material-ui/icons").then((mod) => {
//   //   return mod.Search;
//   // });

//   // const DynamicComp = dynamic(ImportFunc, {
//   //   loading: BlankIcon,
//   // });
//   // return DynamicComp;
// };

export const PButton = ({ content, size }: { content: ButtonPart, size: string }) => {

  const { label, icon, link_type, page_link, url_link = "/", style = "primary", color = "primary" } = content;
 // TODO Page Links
 // TODO colorScheme
 // TODO Button Style

  return (
    <Button size={size} className="__p-button">
      <Link target={link_type === "url" ? "_blank" : "_self"} href={url_link}>
        {label} 
      </Link>
    </Button>
  );
};

export default PButton;
