export const getPageList = async () => {
    const res = await fetch(`${process.env.PAYLOAD_URL}/pages/list`);

    if(!res.ok){
        throw new Error("Failed to fetch page list.");
    }
    console.log('pagelist', res.json());
    return res.json()
}

export const getPageBySlug = async (slug: string) => {
    const res = await fetch(`${process.env.PAYLOAD_URL}/pages?where[slug][equals]=${slug}`);

    if(!res.ok){
        throw new Error("Failed to fetch page data.");
    }
    console.log('pageData', res.json());
    return res.json()
}