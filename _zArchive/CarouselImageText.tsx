import { ImageText, ImageTextProps } from "./ImageText";
import PCarousel from "./PCarousel";

export interface CarouselImageTextProps extends Omit<ImageTextProps, 'body' | 'media' > {
    min_height?: number;
    image_text: ImageText[];
}

type ImageText = {
    body: string,
    media: Global.ImageWithFormats
}

export const CarouselImageText = ({content}: {content: CarouselImageTextProps}) => {
    const {
        image_width = 'half',
        image_side = 'left',
        image_v_align = 'center',
        separate_blocks = false,
        min_height = 200,
        image_text,
        bg_color,
    } = content;

    const baseProps = {
        image_width,
        image_side,
        image_v_align,
        separate_blocks,
        bg_color
    };
    return(
        <PCarousel height={`${min_height}px`} >
            {image_text && 
                image_text.map((slide, i) => {
                    const slideProps: ImageTextProps = {
                        ...baseProps,
                        body: slide.body,
                        media: slide.media
                    }
                    return (
                        <ImageText key={`slide-${i}`} content={slideProps} />
                    )
                })
            }
        </PCarousel>
    )
}