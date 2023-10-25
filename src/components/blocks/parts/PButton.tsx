import type { ButtonPart } from "@/types/payload-types";
import type { ButtonProps, MantineSize } from "@mantine/core";
import { Button } from "@mantine/core";
import Link from "next/link";

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

export const PButton = ({
  button,
  size,
  external
}: {
  button: ButtonPart;
  size: MantineSize;
  external: boolean
}) => {
  const {
    label,
    icon,
    link_type,
    page_link,
    url_link = "/",
    style = "primary",
    color = {
      name: "primary",
    },
  } = button || {};
  // TODO Button Style Outline background color white

  const variant =
    style === "primary"
      ? "filled"
      : style === "secondary"
      ? "outline"
      : "primary";

  const props : ButtonProps = {
    variant: variant,
    size: size,
    //@ts-ignore
    color: color.name,
  }

  if( link_type === "url"){
    return (
      <Button {...props} component="a" href={url_link}>{label}</Button>
    )
  } else if (link_type === "page"){
    return (
      <Button {...props} component={Link} href={`/${typeof page_link !== "string" ? page_link?.slug : ""}`}>{label}</Button>
    )
  }

};

export default PButton;
