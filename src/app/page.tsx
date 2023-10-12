import GlobalBase from "@/components/GlobalBase";
import PageBase from "@/components/PageBase";
import { getStrapiPageData } from "@/lib/strapiAPI";
// import { getPageMetaData } from "@/lib/globalData";
import { getPageBySlug } from "@/lib/payloadAPI";



// export async function generateMetadata() {
//     const pageData: Global.Page = await getStrapiPageData('home');
//     return getPageMetaData(pageData);
// }

export default async function Page() {
    const pageData = await getPageBySlug('home');
    console.log("pageData", pageData)

 return ( 
    <GlobalBase>
        <h1>Imma home page</h1>
        {/* <PageBase page={pageData} /> */}
    </GlobalBase>
 )   
}