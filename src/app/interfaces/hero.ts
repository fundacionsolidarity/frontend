export interface Hero {
    data: Data;
    meta: Meta;
}

export interface Data {
    id:              number;
    documentId:      string;
    title:           string;
    subtitle:        string;
    cta_text:        string;
    cta_link:        string;
    createdAt:       Date;
    updatedAt:       Date;
    publishedAt:     Date;
    carousel_images: CarouselImage[];
}

export interface CarouselImage {
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
    provider:          Provider;
    provider_metadata: ProviderMetadata;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
}

export enum EXT {
    Jpg = ".jpg",
}

export interface Formats {
    large:     Large;
    small:     Large;
    medium:    Large;
    thumbnail: Large;
}

export interface Large {
    ext:               EXT;
    url:               string;
    hash:              string;
    mime:              MIME;
    name:              string;
    path:              null;
    size:              number;
    width:             number;
    height:            number;
    sizeInBytes:       number;
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

export enum Provider {
    Cloudinary = "cloudinary",
}

export interface Meta {
}
