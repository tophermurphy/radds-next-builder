//Map Component Name to Component here

import { Quote } from "../src/components/blocks/Quote";
import { Buttons } from "../src/components/blocks/Buttons";
import { CarouselImageText } from "./CarouselImageText";
import { ColumnsCards } from "./ColumnsCards";
import { ColumnsContent } from "./ColumnsContent";
import { ColumnsImages } from "./ColumnsImages";
import { Content } from "./Content";
import { Divider } from "../src/components/blocks/Divider";
import { FAQ } from "./FAQ";
import { Hero } from "./Hero";
import { Images } from "./Images";
import { ImageText } from "./ImageText";
import Accordion from "../src/components/blocks/Accordion";
import { Tabs } from "../src/components/blocks/Tabs";
import { HeadingInfo, HeadingInfoProps } from "./HeadingInfo";
import { Heading } from "../src/components/blocks/Heading";
import { SocialLinks } from "./SocialLinks";


//TODO Properly type the props for BlockType > component

interface BlockTypes {
  [key: string]: {
    useOptions: boolean,
    component: React.FC<{ content: any, options?: Global.BlockColumns | Global.BlockOptions}>;
  };
};


export const Blocks: BlockTypes = {
  "blocks.accordion": { useOptions: true, component: Accordion },
  "blocks.buttons": { useOptions: true, component: Buttons },
  "blocks.cards": { useOptions: true, component: ColumnsCards },
  "blocks.carousel-image-text": {
    useOptions: true,
    component: CarouselImageText,
  },
  "blocks.columns-content": { useOptions: true, component: ColumnsContent },
  "blocks.columns-images": { useOptions: true, component: ColumnsImages },
  "blocks.content": { useOptions: true, component: Content },
  "blocks.divider": { useOptions: true, component: Divider },
  "blocks.faqs": { useOptions: true, component: FAQ },
  "blocks.heading-info": { useOptions: true, component: HeadingInfo },
  "blocks.heading": { useOptions: true, component: Heading },
  "blocks.hero": { useOptions: false, component: Hero },
  "blocks.images": { useOptions: true, component: Images },
  "blocks.image-text": { useOptions: true, component: ImageText },
  "blocks.quote": {
    useOptions: true,
    component: Quote,
  },
  "blocks.social-links": { useOptions: true, component: SocialLinks },
  "blocks.tabs": { useOptions: true, component: Tabs },
};

