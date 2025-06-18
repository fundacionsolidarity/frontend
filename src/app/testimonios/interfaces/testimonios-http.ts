export interface TestimonioRequest {
    data: Testimonio[];
    meta: Meta;
}

export interface Testimonio {
    id:          number;
    documentId:  string;
    destacado:   null;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    icon:        string;
    text:        Text[];
    name:        null | string;
}

export interface Text {
    type:     TextType;
    children: Child[];
}

export interface Child {
    type: ChildType;
    text: string;
}

export enum ChildType {
    Text = "text",
}

export enum TextType {
    Paragraph = "paragraph",
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page:      number;
    pageSize:  number;
    pageCount: number;
    total:     number;
}
