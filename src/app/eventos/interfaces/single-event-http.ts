export interface SingleEvent {
    data: EventoSingle;
    meta: Meta;
}

export interface EventoSingle {
    id:          number;
    documentId:  string;
    Titulo:      string;
    descripcion: string;
    fecha:       Date;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    imagen:      Imagen[];
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
    ext:               EXT;
    mime:              MIME;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: ProviderMetadata;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
}

export enum EXT {
    Jpg = ".jpg",
}

export interface Formats {
    thumbnail: Large;
    small:     Large;
    medium:    Large;
    large:     Large;
}

export interface Large {
    name:              string;
    hash:              string;
    ext:               EXT;
    mime:              MIME;
    path:              null;
    width:             number;
    height:            number;
    size:              number;
    sizeInBytes:       number;
    url:               string;
    provider_metadata: ProviderMetadata;
}

export enum MIME {
    ImageJPEG = "image/jpeg",
}

export interface ProviderMetadata {
    public_id:     string;
    resource_type: ResourceType;
}

export enum ResourceType {
    Image = "image",
}

export interface Meta {
    
}
