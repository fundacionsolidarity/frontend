export interface EquipoRequest {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id:          number;
    documentId:  string;
    Nombre:      string;
    Cargo:       string;
    Biografia:   Biografia[];
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    Foto:        Foto[];
}

export interface Biografia {
    type:     string;
    children: Child[];
}

export interface Child {
    type: string;
    text: string;
}

export interface Foto {
    id:                number;
    documentId:        string;
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
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
