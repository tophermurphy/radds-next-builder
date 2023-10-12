import GlobalBase from "@/components/GlobalBase";
import PageBase from "@/components/PageBase";
import { getPageMetaData, getPagePaths } from "@/lib/globalData";
import { getStrapiPageData } from "@/lib/strapiAPI";
import { getPageList, getPageBySlug } from "@/lib/payloadAPI";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const pages = await getPageList();
  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}

// export async function generateMetadata({ params }: Params) {
//   const pageData: Global.Page = await getStrapiPageData(params.slug);
//   return getPageMetaData(pageData);
// }

export default async function Page({ params }: Params) {
  const pageData = await getPageBySlug(params.slug);
  console.log('pageData', pageData);
  return (
    <GlobalBase>
      <h1>Dynamo Page</h1>
      {/* <PageBase page={pageData} /> */}
    </GlobalBase>
  );
}
