import type { Page, Params } from "@/types/api";
const qs = require("qs");

const STRAPI_URL = process.env.API_URL || "http://127.0.0.1:1337";
const PAGE_QUERY = "?fields[0]=slug&fields[1]=id&fields[2]=title";
const pageParams = {
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

const pageQuery = qs.stringify(pageParams);

export function normalizeStrapi(item: any) {
  //* flatten objects that nest values in data and attributes
  function flatten(obj: any) {
    if (Object.hasOwn(obj, "data") ) {
      if( !obj.data ) return null;
      if (Object.hasOwn(obj.data, "attributes") ) {
        return obj.data.attributes;
      } else {
        return obj.data;
      }
    } else if (Object.hasOwn(obj, "attributes") ) {
      return obj.attributes;
    } else {
      return obj;
    }
  }

  if (typeof item === null || typeof item !== "object") {
    return item;
  } else if (item.constructor.name === "Object") {
    let flatObj = flatten(item);
    for (const prop in flatObj) {
      if (flatObj[prop] !== null && typeof flatObj[prop] === "object") {
        const newItem = normalizeStrapi(flatObj[prop]);
        flatObj[prop] = newItem;
      }
    }
    return flatObj;
  } else if (item.constructor.name === "Array") {
    let newArr = item.map((i: any) => {
      return normalizeStrapi(i);
    });
    return newArr;
  } else {
    //* Prolly don't need this, but just incase something is not an object or null
    return;
  }
}

export async function getGlobalStrapiData() {
  const res = await fetch(STRAPI_URL + "/api/settings");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getStrapiPagePaths() {
  const data = await fetch(`${STRAPI_URL}/api/pages?${pageQuery}`, {
    next: { revalidate: 60 },
  })
    .then((res) => res.json())
    .then((data) => data.data.map((i: any) => i.attributes));

  const normalizedData = normalizeStrapi(data);
  return normalizedData;
}

export async function getPagePaths() {
  const data = await fetch(`${STRAPI_URL}/api/pages${PAGE_QUERY}`)
    .then((res) => res.json())
    .then((data) => data.data);

  const paths = data.reduce((array: any[], cv: Page) => {
    const slug: string | boolean = cv?.attributes?.slug;
    if (slug === "home" || !slug) return array;
    return [...array, { params: { slug } }];
  }, []);

  return paths;
}

export async function getStrapiPageData(slug: string = "") {
  const data = await fetch(
    `${STRAPI_URL}/api/pages?filters[slug]=${slug}&populate=deep`,
    { next: { revalidate: 60 } }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length < 1) {
        throw new Error("Page data not found.");
      } else {
        const pageAttibutes = normalizeStrapi(data.data[0].attributes);
        return pageAttibutes;
      }
    })
    .catch((err) => new Error(err));

  return data;
}
