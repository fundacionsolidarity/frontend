import { fetchAPI } from '@/app/lib/api';
import {  EventRequest } from '@/app/eventos/interfaces/request-http'; 
import { EventoSingle, SingleEvent } from '../interfaces/single-event-http';
import { truncateWords } from '@/app/helpers/truncate-word';
import { EventDetail } from '../components/EventDetail';


export async function generateStaticParams() {
  const response: EventRequest = await fetchAPI('/eventos');
  if( !response ) return;
  const { data }  = response;
  if (!data || data.length === 0) {   
    return [];
  }
  return data.map((evento) => ({
    id: String(evento.documentId),
  }));
}

export async function generateMetadata({ params }: { params: { locale: string; id: string; } }) {
  const { locale, id } = params;
  const response = await fetchAPI('/eventos/' + id) as SingleEvent; 
  if( !response ) return;
  const { data } = response;
  const evento: EventoSingle = data; 

  const siteUrl = "https://www.fsolidaritycolombia.org"; // IMPORTANTE: Reemplaza con la URL base de tu sitio web

  if (!evento) {
    return {
      title: "Evento no encontrado - Fundación Solidarity Colombia",
      description: "El evento que buscas no existe o ya no está disponible.",
      openGraph: {
        url: `${siteUrl}/${locale}/eventos/${id}`,
        type: 'website',
      },
    };
  }

  const defaultImageUrl = "https://placehold.co/1200x630/CCCCCC/FFFFFF?text=Evento+FSC";
  const imageUrl = evento.imagen?.[0]?.formats?.large?.url || evento.imagen?.[0]?.url || defaultImageUrl;
  const imageWidth = evento.imagen?.[0]?.formats?.large?.width || 1200;
  const imageHeight = evento.imagen?.[0]?.formats?.large?.height || 630;
  const imageAlt = `Imagen de ${evento.Titulo}`;

  const descriptionText = evento.descripcion || evento.descripcion;

  return {
    title: `${evento.Titulo} - Eventos Fundación Solidarity Colombia`,
    description: truncateWords(descriptionText, 160),
    keywords:  'evento, fundación, solidaridad, Colombia, actividades',
    openGraph: {
      title: `${evento} - Eventos Fundación Solidarity Colombia`,
      description: truncateWords(descriptionText, 200),
      url: `${siteUrl}/${locale}/eventos/${evento.id}`,
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
      locale: locale,
      type: 'article', // 'article' es apropiado para páginas de detalle de eventos/noticias
      publishedTime: evento.fecha ? new Date(evento.fecha).toISOString() : undefined,
      modifiedTime: evento.fecha ? new Date(evento.fecha).toISOString() : undefined, // Si tienes una fecha de modificación
      // authors: ['Fundación Solidarity Colombia'], // Si aplica
    },
    twitter: {
      card: 'summary_large_image',
      title: `${evento.Titulo} - Eventos Fundación Solidarity Colombia`,
      description: truncateWords(descriptionText, 160),
      creator: '@TuTwitterHandle', // Opcional: Tu handle de Twitter si tienes uno
      images: [imageUrl],
    },
  };
}



export default async function EventoDetailPage({ params }: { params: { id: string } }) {
    const response: SingleEvent = await fetchAPI(`/eventos/${params.id}`);
    if( !response ) return;

    return(
      <EventDetail
        dataProp={ response }
      >
      </EventDetail>
    );

}