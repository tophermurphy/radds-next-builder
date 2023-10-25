//TODO: Lexical Media Fields not working in CMS

import Image from "next/image";

export interface PLexicalMedia {
  value: {
    id: string;
    alt?: string;
    width: number;
    height: number;
    url: string;
  };
}

export const PLexicalMedia = ({ value }: PLexicalMedia) => {
  const { id, alt = "", width, height, url } = value || {};

  return <Image id={id} alt={alt} width={width} height={height} src={url} />;
};

export default PLexicalMedia;