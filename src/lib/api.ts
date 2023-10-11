import type { Page, Params } from "@/types/api";

const strapiUrl = process.env.STRAPI_URL;

const pageQuery = {
  populate: {
    layout: {
      fields: ["name"],
    },
    meta_tags: {
      fields: ["name", "property", "content"],
    },
    meta_media: {
      populate: {
        media: {
          fields: ["url", "mime", "width", "height"],
        },
      },
    },
  },
  fields: ["title", "slug", "description", "addToSitemap"],
};

const pathParams = "?fields[0]=slug&fields[1]=id&fields[2]=title";

const pagePathParams =
  "/api/pages?populate[layout][fields][0]=name&populate[meta_tags][fields][0]=name&populate[meta_tags][fields][1]=property&populate[meta_tags][fields][2]=content&populate[meta_media][populate][media][fields][0]=url&populate[meta_media][populate][media][fields][1]=mime&populate[meta_media][populate][media][fields][2]=width&populate[meta_media][populate][media][fields][3]=height&fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=addToSitemap";

// export async function getPagePaths() {
//   const data = await fetch(`${strapiUrl}/api/pages${pathParams}`)
//     .then((res) => res.json())
//     .then((data) => data.data);

//   const paths = data.reduce((array: any[], cv: Page) => {
//     const slug: string | boolean = cv?.attributes?.slug;
//     if (slug === "home" || !slug) return array;
//     return [...array, { params: { slug } }];
//   }, []);

//   return paths;
// }

export async function getNavLinks() {
  const data = await fetch(`${strapiUrl}/api/header?populate=deep`)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch(() => {
      console.warn("Nav links found");
    });
  return data?.attributes ?? { navLinks: [] };
}

export async function getThemeColors(): Promise<
  { name: string; hex: string }[]
> {
  return await fetch(`${strapiUrl}/api/theme-colors`)
    .then((res) => res.json())
    .then((data) => {
      const colorData = data.data.map((color: any) => ({
        name: color.attributes.name,
        hex: color.attributes.light,
      }));
      return colorData;
    });
}
