/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export type ListPart = {
  title: string;
  textEditor?: {
    [k: string]: unknown;
  }[];
  id?: string;
}[];

export interface Config {
  collections: {
    pages: Page;
    media: Media;
    theme_colors: ThemeColor;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    sitebs: Siteb;
  };
}
export interface Page {
  id: string;
  title?: string;
  sections?: (SectionRow | SectionColumns)[];
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface SectionRow {
  columns?: '1' | '2';
  layout?: '6_6' | '5_7' | '7_5' | '4_8' | '8_4' | '3_9' | '9_3';
  col_1_blocks?: (BlockHeading | BlockParagraph | BlockAccordion | BlockCard | BlockButtons | BlockTextEditor)[];
  col_2_blocks?: (BlockHeading | BlockParagraph | BlockAccordion | BlockCard | BlockButtons | BlockTextEditor)[];
  section_options?: SectionOptions;
  id?: string;
  blockName?: string;
  blockType: 'row';
}
export interface BlockHeading {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  heading?: string;
  id?: string;
  blockName?: string;
  blockType: 'heading';
}
export interface BlockParagraph {
  paragraph?: string;
  id?: string;
  blockName?: string;
  blockType: 'paragraph';
}
export interface BlockAccordion {
  title?: string;
  columns?: '1' | '2' | '3' | '4';
  list?: ListPart;
  id?: string;
  blockName?: string;
  blockType: 'accordion';
}
export interface BlockCard {
  title?: string;
  subtitle?: string;
  image?: string | Media;
  textEditor?: {
    [k: string]: unknown;
  }[];
  card_color?: string | ThemeColor;
  id?: string;
  blockName?: string;
  blockType: 'card';
}
export interface Media {
  id: string;
  alt?: string;
  title?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    small?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    medium?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
}
export interface ThemeColor {
  id: string;
  name: string;
  color?: string;
  updatedAt: string;
  createdAt: string;
}
export interface BlockButtons {
  size?: 'sm' | 'md' | 'lg';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-evenly';
  buttons: {
    button: ButtonPart;
    id?: string;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'buttons';
}
export interface ButtonPart {
  label: string;
  icon?: string;
  link_type?: 'page' | 'url';
  page_link?: string | Page;
  url_link?: string;
  style?: 'primary' | 'secondary';
  color?: string | ThemeColor;
}
export interface BlockTextEditor {
  textEditor?: {
    [k: string]: unknown;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'textEditor';
}
export interface SectionOptions {
  width?: 'container' | 'container-sm' | 'container-full' | 'container-bleed';
  padding?: 'py-block' | 'pt-block' | 'pb-block' | 'p0-block';
  bg_color?: string | ThemeColor;
  variant?: string;
  anchor?: string;
}
export interface SectionColumns {
  blocks?: (BlockHeading | BlockParagraph | BlockAccordion | BlockCard | BlockButtons | BlockTextEditor)[];
  column_options?: ColumnOptions;
  section_options?: SectionOptions;
  id?: string;
  blockName?: string;
  blockType: 'columns';
}
export interface ColumnOptions {
  columns?: '2' | '3' | '4' | '5' | '6';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password: string;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string;
  batch?: number;
  updatedAt: string;
  createdAt: string;
}
export interface Siteb {
  id: string;
  thing_1?: string;
  color?: string;
  updatedAt?: string;
  createdAt?: string;
}


declare module 'payload' {
  export interface GeneratedTypes {
    collections: {
      'pages': Page
      'media': Media
      'theme_colors': ThemeColor
      'users': User
      'payload-preferences': PayloadPreference
      'payload-migrations': PayloadMigration
    }
    globals: {
      'sitebs': Siteb
    }
  }
}