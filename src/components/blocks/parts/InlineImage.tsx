/* eslint-disable @next/next/no-img-element */
export interface InlineImageProps {
    node: {
        attrs: {
            src: string;
            alt: string;
            title?: string;
        }
    }
}

export const InlineImage = ({node}: InlineImageProps) => {
    const {src, alt, title} = node.attrs;
    return <img src={src} alt={alt} title={title} style={{display: "inline"}}  />
}

export default InlineImage;