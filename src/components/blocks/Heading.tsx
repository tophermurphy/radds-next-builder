import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

//Todo Rename PageTitle & Update Description in Strapi

export interface HeadingProps {
    content: {
        title: string;
    }
}

export const Heading = ({content}: HeadingProps) => {
    const route = useRouter();
    // console.log('route', route);
    // const element = route.asPath === "/" ? "h2" : "h1";
    const element = 'h1';
    return(
        <Box as={element} textStyle='h1' className="block __title-header">{ content.title }</Box>
    )
}