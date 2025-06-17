export interface ResourceHTTP {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id:          number;
    documentId:  string;
    titulo:      string;
    descripcion: string;
    categoria:   string | null;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    externalUrl: null;
    archivo:     Archivo[];
}

export interface Archivo {
    id:                number;
    documentId:        string;
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             null;
    height:            null;
    formats:           null;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: ProviderMetadata;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
}

export interface ProviderMetadata {
    public_id:     string;
    resource_type: string;
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
