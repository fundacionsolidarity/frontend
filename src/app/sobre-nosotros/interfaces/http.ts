export interface SobreNosotrosRequest {
    data: SobreNosotros;
    meta: Meta;
}

export interface SobreNosotros {
    id:                     number;
    documentId:             string;
    Mision:                 Mision[];
    vision:                 Mision[];
    historia:               Mision[];
    createdAt:              Date;
    updatedAt:              Date;
    publishedAt:            Date;
    objetivo_general:       Mision[];
    objectivos_especificos: ObjectivosEspecifico[];
    imagen:                 Imagen[];
}

export interface Mision {
    type:     string;
    children: MisionChild[];
}

export interface MisionChild {
    type: Type;
    text: string;
}

export enum Type {
    ListItem = "list-item",
    Text = "text",
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

export interface ObjectivosEspecifico {
    type:     string;
    format:   string;
    children: ObjectivosEspecificoChild[];
}

export interface ObjectivosEspecificoChild {
    type:     string;
    children: PurpleChild[];
    format?:  string;
}

export interface PurpleChild {
    type:      Type;
    text?:     string;
    bold?:     boolean;
    children?: MisionChild[];
}

export interface Meta {
}
