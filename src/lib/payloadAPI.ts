export const getPageList = async () => {
    const res = await fetch(`${process.env.PAYLOAD_URL}/api/pages/list`, {next: {revalidate: 30}});
    if(!res.ok){
        throw new Error("Failed to fetch page list.");
    }
    return res.json()
}

export const getPageBySlug = async (slug: string) => {
    const res = await fetch(`${process.env.PAYLOAD_URL}/api/pages?depth=1&where[slug][equals]=${slug}`, {next: {revalidate: 30}});
    if(!res.ok){
        throw new Error("Failed to fetch page data.");
    }
    const data = await res.json();
    
    if( !Array.isArray(data.docs) && data.docs.length < 1 ){
        throw new Error("No Page is Found");
    }
    return data.docs[0];
}

export const getAPIColors = async () => {
    const res = await fetch(`${process.env.PAYLOAD_URL}/api/theme_colors`, {next: {revalidate: 30}});
    if(!res.ok){
        throw new Error("Failed to fetch page data.");
    }
    const data = await res.json();

    return data;
}   

export const getPayloadSiteOptions = async () => {
    const res = await fetch(`${process.env.PAYLOAD_URL}/api/globals/site_options`, {next: {revalidate: 30}});
    if(!res.ok){
        throw new Error("Failed to fetch site options.");
    }
    return res.json()
}

