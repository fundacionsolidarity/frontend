export interface EventRequest {
    data: Evento[];
    meta: Meta;
}

export interface Evento {
    id:          number;
    documentId:  string;
    Titulo:      string;
    descripcion: string;
    fecha:       Date;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    imagen:      ImagenEvento[];
}

export interface ImagenEvento {
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