export interface NoticiaUniqueRequest {
    data: Noticia[];
    meta: Meta;
}

export interface Noticia {
    id:          number;
    documentId:  string;
    titulo:      string;
    contenido:   Contenido[];
    fecha:       Date;
    visible:     boolean;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    tags:        string;
    imagen:      Imagen[];
}

export interface Contenido {
    type:     string;
    children: Child[];
}

export interface Child {
    type: string;
    text: string;
}

export interface Imagen {
    id:                number;
    documentId:        string;
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           Formats;
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

export interface Formats {
    large:     Large;
    medium:    Large;
    thumbnail: Large;
    small:     Large;
}

export interface Large {
    name:              string;
    hash:              string;
    ext:               string;
    mime:              string;
    path:              null;
    width:             number;
    height:            number;
    size:              number;
    sizeInBytes:       number;
    url:               string;
    provider_metadata: ProviderMetadata;
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
