//Definitions for Data Returned from Strap CMS
namespace Strapi {
  import { FlexRowProps } from "components/blocks/parts/FlexRow";

  export interface Page {
    id: number;
    attributes: PageAttributes;
  }

  export interface PageAttributes {
    title: string;
    slug: string;
    addToSitemap: boolean;
    remove_heading: boolean;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    meta?: { name: string; value: string }[];
    content: Block[];
    layout: PageLayout;
  }

  export interface PageLayout {
    data?: any;
  }

  export interface Block {
    [key: string]: any;
    id: number;
    __component: string;
    conditionals: any[];
    options_general?: OptionsGeneral;
  }

  export interface BlockContent {
    [key: string]: any;
    id: number;
    __component: string;
  }

  export interface BlockComponent
    extends React.FC<{ content: BlockContent; options?: OptionsGeneral }> {}
  export interface OptionsGeneral {
    padding: PaddingTypes;
    width: ContainerWidths;
    anchor?: string | null;
    bg_color: BlockBGColor | null;
    custom_classes: BlockCustomClasses | null;
  }

  export type ContainerWidths = "standard" | "narrow" | "full" | "edge_to_edge";
  export type PaddingTypes = "top_bottom" | "top" | "bottom" | "none";

  export interface Conditionals {}

  export interface Data<T> {
    id: number;
    attributes: {
      [P in keyof T]: T[P];
    };
  }

  export interface ThemeColor {
    name: string;
    light: string;
    dark?: string;
  }

  export interface CustomClass {
    classname: string;
  }

  export type BlockBGColor = {
    data: Data<ThemeColor>;
  };

  export type BlockCustomClasses = {
    data: Data<CustomClass>[];
  };

  export interface EditorNode {
    type: string;
    attrs?: {
      [key: string]: string | number | boolean;
      className?: string;
    };
    content?: Mark[] | EditorNode[];
  }
  export type Mark = {
    type: string;
    text: string;
    marks?: Mark[];
  };

  export interface mediaFormats {
    url: string;
    width: number;
    height: number;
    size: number;
    mime: string;
    ext: string;
    hash: string;
  }
  export interface mediaAttributes {
    url: string;
    width: number;
    height: number;
    name: string;
    size: number;
    ext: string;
    mime: string;
    alternativeText?: string;
    caption?: string;
    formats: {
      [key: string]: mediaFormats
    }
  }

  export type Column = `c_${number}`

  export interface Columns {
    justify: FlexRowProps['justify'];
    columns: Column;
  }

}
