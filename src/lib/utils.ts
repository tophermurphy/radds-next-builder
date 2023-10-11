type ContainerWidths = "standard" | "narrow" | "full" | "edge_to_edge";
type PaddingTypes = "top_bottom" | "top" | "bottom" | "none";
export interface ContainerProps {
  width: ContainerWidths;
  padding: PaddingTypes;
  bg_color?: Global.Color | null;
}


export class GetContainerProps {
  maxW?: string;
  px?: {
    base: number;
    md: number;
  };
  pt?: number;
  pb?: number;
  bg?: string;

  constructor({
    width = "standard",
    padding = "top_bottom",
    bg_color,
  }: ContainerProps) {
    const widthProps: {
      [key: string]: {
        maxW: string;
        px: {
          base: number;
          md: number;
        };
      };
    } = {
      standard: {
        maxW: "1200px",
        px: {
          base: 4,
          md: 6,
        },
      },
      narrow: {
        maxW: "60ch",
        px: {
          base: 4,
          md: 6,
        },
      },
      full: {
        maxW: "100%",
        px: {
          base: 4,
          md: 6,
        },
      },
      edge_to_edge: {
        maxW: "100%",
        px: {
          base: 0,
          md: 0,
        },
      },
    };

    const paddingProps: {
      [key: string]: {
        pt: number;
        pb: number;
      };
    } = {
      top_bottom: {
        pt: 6,
        pb: 6,
      },
      top: {
        pt: 6,
        pb: 0,
      },
      bottom: {
        pt: 0,
        pb: 6,
      },
      none: {
        pt: 0,
        pb: 0,
      },
    };

    const { maxW, px } = widthProps[width];
    const { pt, pb } = paddingProps[padding];

    this.maxW = maxW;
    this.px = px;
    this.pt = pt;
    this.pb = pb;
    this.bg = bg_color?.name ?? 'transparent';
  }
}

export const parseStrapiColumn = (column: Strapi.Column) => {
  return (100 / parseInt(column.replace("c_", ""), 10)).toFixed(4) + "%";
};

export const parseLink = (link: string) => {
  const regex = new RegExp("^(http://|https://|/)");
  if( regex.test(link) ){
    return link;
  } else {
    return `/${link}`;
  }
}