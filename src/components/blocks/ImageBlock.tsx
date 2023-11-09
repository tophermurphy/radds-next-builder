import type { BlockImage } from "@/types/payload-types";
import Image, { ImageProps } from "next/image";
import { Flex } from "@mantine/core";

interface ImageBlock {
    content: BlockImage
}

export const ImageBlock: React.FC<ImageBlock> = ({content}) => {
    const {image, justify = "center", align = "center", fill} = content;
    if ( !image || typeof image === "string") return null;
    const { id, alt = "", url, width, height } = image;
    if( !url ) return null;
    
    let props: any = {
        id,
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
            <Image width={width} height={height} alt={alt} src={url} {...props} />
        </Flex>
    )
}

export default ImageBlock;