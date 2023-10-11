export interface Page {
    id: number;
    attributes: PageAttributes;
}

export interface PageAttributes {
    title: string;
    addToSiteMap?: boolean;
    remove_heading?: boolean;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    slug: string;
    content?: PageContent[];
    meta?: PageMeta[];
    layout?: PageLayout;
}

//@TODO Needs more work
export interface PageContent {
    id: number;
    __component: string;
    conditionals?: any[];
    [key: string]: any;
}

export interface PageMeta {
    [key: string]: any;
}

export interface PageLayout {
    data: {
        attributes: {
            name: string;
        }
    }
}

export interface Params {
    params: {
        id: number;
        slug: string;
        title: string;    
    }
}
