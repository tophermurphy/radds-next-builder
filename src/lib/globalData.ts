//* Determine data source via .env 
// Route to appropriate api call
// Normalize data response
// Return normalized data

import { Metadata } from "next";
import { getGlobalStrapiData, getStrapiPagePaths } from "./strapiAPI";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

type dataSource = 'markdown' | 'strapi';
const DATA_PROVIDER = process.env.DATA_PROVIDER || 'strapi';


export async function getGlobalData(): Promise<Global.GlobalData> {
    // if( DATA_PROVIDER !== 'strapi') return;
    return await getGlobalStrapiData();
}

export async function getPagePaths(){
    // if( DATA_PROVIDER !== 'strapi') return;
    return await getStrapiPagePaths();
} 

//* Next.js is really stingy about how to add the page metadata
//* If there is an issue, will probably have to look to another route
//* to add page metadata

export function getPageMetaData(pageData: Global.Page): Metadata {
    const IMAGE_URL = process.env.IMAGE_URL || 'http://localhost:1337';

    const getOtherTags = (): undefined | Util.ObjectMap => {
        if( !pageData.meta_tags || !pageData.meta_tags.length ) return undefined;
        return pageData.meta_tags.reduce((obj: any, tag) => {
          return  {...obj, ...{[tag.name]: tag.content}}
        }, {})
      };
  
      let ogImages: undefined | OpenGraph['images'];
      let ogVideo: undefined | OpenGraph['videos'];
  
      if( pageData.meta_media && pageData.meta_media.length ){
        pageData.meta_media.forEach((item) => {
           const mediaObject = {
              url: IMAGE_URL + item.url,
              width: item.width,
              height: item.height,
              type: item.mime
           };
           if(item.mime.includes('video')){
              if( !Array.isArray(ogVideo) ){
                 ogVideo = []
              }
              ogVideo.push(mediaObject)
           } else if( item.mime.includes('image')){
              if( !Array.isArray(ogImages) ){
                 ogImages = []
              }
              ogImages.push(mediaObject)
           }
        })
      };
  
      const metadata: Metadata = {
          title: pageData.title,
          description: pageData.description || '',
          openGraph: {
              title: pageData.title,
              description: pageData.description || '',
              images: ogImages,
              videos: ogVideo
          },
          other: getOtherTags()
      }
  
      return metadata;
}