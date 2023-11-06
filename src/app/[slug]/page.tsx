import GlobalBase from "_zArchive/GlobalBase";
import PageBase from "@/components/PageBase";
import { getPageList, getPageBySlug } from "@/lib/payloadAPI";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const pages = await getPageList();
  return pages.data.pageList.map(({slug}: { slug: string}) => ({
    slug,
  }));
}

// export async function generateMetadata({ params }: Params) {
//   const pageData: Global.Page = await getStrapiPageData(params.slug);
//   return getPageMetaData(pageData);
// }

export default async function Page({ params }: Params) {
  const pageData = await getPageBySlug(params.slug);
  return (
    <>
      <h1>Dynamo Page</h1>
      <PageBase page={pageData} />
    </>
  );
}
