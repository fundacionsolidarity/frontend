export interface Hero {
    data: Data;
    meta: Meta;
}

export interface Data {
    id:          number;
    documentId:  string;
    titulo:      string;
    subtitulo:   string;
    visible:     boolean;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    cta_text:    string;
    cta_link:    string;
}

export interface Meta {
}
