export interface FooterRequest {
    data: Footer;
    meta: Meta;
}

export interface Footer {
    id:          number;
    documentId:  string;
    Name:        string;
    subtitulo:   string;
    email:       string;
    telefono:    string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
}

export interface Meta {
}
