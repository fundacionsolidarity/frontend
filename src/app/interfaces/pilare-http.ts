export interface PilaresRequest {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id:          number;
    documentId:  string;
    Icon:        string;
    title:       string;
    subtitle:    Subtitle[];
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
}

export interface Subtitle {
    type:     string;
    children: Child[];
}

export interface Child {
    type: string;
    text: string;
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
