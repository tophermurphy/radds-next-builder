export const getPageList = async () => {
    const res = await fetch(`${process.env.PAYLOAD_URL}/api/pages/list`, { cache: 'no-store' });
    if(!res.ok){
        throw new Error("Failed to fetch page list.");
    }
    return res.json()
}

export const getPageBySlug = async (slug: string) => {
    const res = await fetch(`${process.env.PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}`, { next: { revalidate: 0 } });
    if(!res.ok){
        throw new Error("Failed to fetch page data.");
    }
    const data = await res.json();
    
    if( !Array.isArray(data.docs) && data.docs.length < 1 ){
        throw new Error("No Page is Found");
    }
    return data.docs[0];
}