import GlobalBase from "@/components/GlobalBase";
import PageBase from "@/components/PageBase";
import { getPageMetaData, getPagePaths } from "@/lib/globalData";
import { getStrapiPageData } from "@/lib/strapiAPI";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const pages = await getPagePaths();
  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Params) {
  const pageData: Global.Page = await getStrapiPageData(params.slug);
  return getPageMetaData(pageData);
}

export default async function Page({ params }: Params) {
  const pageData = await getStrapiPageData(params.slug);
  return (
    <GlobalBase>
      <h1>Dynamo Page</h1>
      <PageBase page={pageData} />
    </GlobalBase>
  );
}
