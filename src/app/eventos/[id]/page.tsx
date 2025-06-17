import { fetchAPI } from '@/app/lib/api';
import {  EventRequest } from '@/app/eventos/interfaces/request-http'; 
import Link from 'next/link'; // Importa Link de Next.js para navegación
import Carousel from '@/app/components/Carousel';
import { EventoSingle, SingleEvent } from '../interfaces/single-event-http';
import { truncateWords } from '@/app/helpers/truncate-word';


export async function generateStaticParams() {
  const { data }: EventRequest = await fetchAPI('/eventos'); 
  console.log({ data });
  if (!data || data.length === 0) {   
    return [];
  }
  return data.map((evento) => ({
    id: String(evento.id),
  }));
}

export async function generateMetadata({ params }: { params: { locale: string; id: string; } }) {
  const { locale, id } = params;
  const { data } = await fetchAPI('/eventos/' + id) as SingleEvent; 
  const evento: EventoSingle = data; 

  const siteUrl = "https://www.tudominio.com"; // IMPORTANTE: Reemplaza con la URL base de tu sitio web

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
    const { data }: SingleEvent = await fetchAPI(`/eventos/${params.id}`);

    if (!data) {
    return (
        <section className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 animate-gradient-flow z-0"></div>
        <div className="relative z-10 p-6 md:p-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Evento no encontrado</h2>
            <p className="text-gray-700">Parece que el evento que buscas no existe.</p>
            <Link 
                href="/eventos" 
                className="mt-6 inline-block px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">Volver a Eventos</Link>
        </div>
        </section>
    );
  }

  return (
    <section className="relative p-8 md:p-12 lg:p-16 min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-gradient-flow z-0"></div>
      <div className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <Link href="/eventos" className="absolute top-6 left-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center">
          <span className="mr-2">⬅️</span> Volver
        </Link>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mt-12 mb-8 tracking-tight">
          {data.Titulo || 'Evento sin título'}
        </h2>
        {data.imagen && data.imagen.length > 0 && (
          <div className="w-full h-72 md:h-96 mb-8 overflow-hidden rounded-2xl shadow-lg">

            <Carousel 
                imgs={data.imagen} 
                hasMultipleImages={data.imagen.length > 1}
                navigation={true}
            />
          </div>
        )}
        {data.fecha && (
          <p className="text-purple-600 font-semibold text-lg text-center mb-6">
            Fecha: {data.fecha.toLocaleString('es-ES')}
          </p>
        )}
        {data.descripcion && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Más detalles:</h3>
            <p className="text-gray-700 leading-relaxed">{data.descripcion}</p>
          </div>
        )}
      </div>
    </section>
  );
}