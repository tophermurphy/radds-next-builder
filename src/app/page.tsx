import GlobalBase from "_zArchive/GlobalBase";
import PageBase from "@/components/PageBase";
import { getPageBySlug } from "@/lib/payloadAPI";

// export async function generateMetadata() {
//     const pageData: Global.Page = await getStrapiPageData('home');
//     return getPageMetaData(pageData);
// } 

export default async function Page() {
    const pageData = await getPageBySlug('home');

 return ( 
        <PageBase page={pageData} />
 )   
}