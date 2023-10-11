import GlobalBase from "@/components/GlobalBase";
import PageBase from "@/components/PageBase";
import { getStrapiPageData } from "@/lib/strapiAPI";
import { getPageMetaData } from "@/lib/globalData";



export async function generateMetadata() {
    const pageData: Global.Page = await getStrapiPageData('home');
    return getPageMetaData(pageData);
}

export default async function Page() {
    const pageData = await getStrapiPageData('home');

 return ( 
    <GlobalBase>
        <PageBase page={pageData} />
    </GlobalBase>
 )   
}