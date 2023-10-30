import type { BlockImage } from "@/types/payload-types";
import NextImage, { ImageProps } from "next/image";
import { Flex } from "@mantine/core";

export interface Image {
    content: BlockImage
}

export const Image: React.FC<Image> = ({content}) => {
    const {image, justify = "center", align = "center", fill = false} = content;
    if ( !image || typeof image === "string") return null;
    const { id, alt = "", url, width, height } = image;
    if( !url ) return null;
    
    let props: ImageProps = {
        src: url,
        id,
        alt,
        width,
        height,
        style: {
            maxWidth: "100%",
        }
    }

    if( fill ){
        props.style = {
            ...props.style,
            objectFit: "cover",
            height: "100%",
            width: "100%",
            objectPosition: `${justify} ${align === "flex-start" ? "top" : align === "flex-end" ? "bottom" : "center"}`
        }
    }

    return (
        <Flex w="100%" h="100%" justify={justify} align={align}>
            <NextImage {...props} />
        </Flex>
    )
}

export default Image;