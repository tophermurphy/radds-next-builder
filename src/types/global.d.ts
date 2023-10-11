namespace Global {
  export interface Image {
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
  }

  export interface ImageFormat {
    [key: string]: Image;
  }

  export interface ImageWithFormats extends Image {
    formats?: ImageFormat[];
  }

  export interface Link {
    link: string;
    label: string;
    new_window: boolean;
  }

  export interface NavLink extends Link {
    icon?: string;
    sub_links?: Link[];
  }

  export type SocialPlatform =
    | "Facebook"
    | "Twitter"
    | "LinkedIn"
    | "YouTube"
    | "Pinterest"
    | "Instagram"
    | "Tumblr"
    | "Flickr"
    | "Reddit"
    | "Snapchat"
    | "WhatsApp"
    | "Quora"
    | "TikTok"
    | "Vimeo";

  export interface SocialLink {
    platform: SocialPlatform;
    url: string;
    other_platform?: string;
  }

  export interface Brand {
    name?: string;
    description?: string;
    ga_id?: string;
    gtm_id?: string;
    favicon?: Image;
    logo?: ImageWithFormats;
  }

  export interface Header {
    main_nav: NavLink[];
  }

  export interface Footer {
    show_copyright?: boolean;
    copyright_first?: string;
    images?: Image;
    footer_links?: Link[];
    social_links?: SocialLink[];
    colophon_links?: Link[];
  }

  export interface ThemeColors {
    theme_colors: Color[];
  }

  export interface Theme extends ThemeColors {
    theme: {
      font_family_body: string;
      font_family_heading?: string;
    };
  }

  export interface ThemeData extends Theme, ThemeColors {}

  export interface BrandData {
    brand: Brand;
    header: Header;
    footer: Footer;
  }

  export interface GlobalData extends BrandData, Theme {};

  export interface Path {
    slug: string;
    title: string;
  }

  export interface MetaData {
    name: string;
    og: boolean;
    content: string;
  }

  export interface PageMeta extends Path {
    description?: string;
    meta_tags?: MetaData[];
    meta_media?: MetaMedia[];
  }

  export interface MetaMedia {
    width: number;
    height: number;
    url: string;
    mime: string;
  }

  export interface TagStandard {
    name: string;
    content: string;
  }

  export interface TagOG {
    property: string;
    content: string;
  }

  export type PropOrString = 'property' | 'name';

  export type MetaTag = TagStandard | TagOG;
  export interface Page extends PageMeta {
    add_to_sitemap: boolean;
    remove_heading: boolean;
    layout?: any;
    content: any[];
  }

  export interface Color {
    name: string;
    color_hex: string;
  }

  export interface BlockVariant {
    name: string;
  }

  export type BlockPaddingOptions = "top_bottom" | "top" | "bottom" | "none";

  export type BlockWidthOptions =
    | "standard"
    | "narrow"
    | "full"
    | "edge_to_edge";

  export interface BlockOptions {
    anchor?: string | null;
    bg_color?: Color | null;
    padding: BlockPaddingOptions;
    variant?: BlockVariant | null;
    width: BlockWidthOptions;
  }

  export type ColumnOptions = "c_2" | "c_3" | "c_4" | "c_5" | "c_6";

  export type JustifyOptions = "center" | "left" | "right" | "stretch";

  export interface BlockColumns {
    columns: ColumnOptions;
    justify: JustifyOptions;
  }

  /// Break

  export interface BlockContent {
    [key: string]: any;
    id: number;
    __component: string;
  }
  export interface Block extends BlockContent {
    options_block?: BlockOptions;
    option_columns?: BlockColumns;
  }

  export interface BlockComponent extends React.FC<{ content: BlockContent }> {}
}
