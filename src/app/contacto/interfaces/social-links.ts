export interface SocialLinks {
    data: Data;
    meta: Meta;
}

export interface Data {
    id:          number;
    documentId:  string;
    Facebook:    null;
    Email:       string;
    Instagram:   null;
    Linkeding:   null;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
}

export interface Meta {
}
