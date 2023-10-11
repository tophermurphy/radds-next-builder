import {
  Box,
  Image as CImage,
  ImageProps as CImageProps,
  Icon,
  IconButton,
  Slide,
} from "@chakra-ui/react";
import PCarousel from "./parts/PCarousel";

export interface ImageProps {
  container_height?: string;
  fill_container: boolean;
  link?: string;
  external?: boolean;
  media: Global.Image[];
}

// TODO: Consider using Next/Image component and doing some optimization

const prefix = "http://localhost:1337";

export const Images = ({
  content: {
    container_height = "200px",
    fill_container = false,
    link,
    external = false,
    media: images,
  },
}: {
  content: ImageProps;
}) => {

  const getImageProps = (image: Global.Image): CImageProps => {
    const { url, alternativeText: altText, width, height } = image;
    return {
      objectPosition: "center",
      htmlHeight: height,
      htmlWidth: width,
      alt: altText,
      src: prefix + url,
      objectFit: fill_container ? "cover" : "contain",
    };
  };

  if (images && images.length) {
    return (
      <PCarousel>
        {images.map((image, i) => {
          const imageProps = getImageProps(image);
          return <CImage key={`image-${i}`} {...imageProps} />;
        })}
      </PCarousel>
    );
  } else {
    const imageProps = getImageProps(images[0]);
    return (
      <Box h={container_height} width="100%">
        <CImage {...imageProps} />
      </Box>
    );
  }
};
