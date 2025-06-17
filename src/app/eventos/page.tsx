import { fetchAPI } from "@/app/lib/api";
import EventCard from "@/app/components/EventoPreview";
import { EventRequest } from "./interfaces/request-http";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const title = "Eventos - Fundación Solidarity Colombia";
  const description = "Descubre los próximos eventos y actividades pasadas de la Fundación Solidarity Colombia. Únete a nuestras iniciativas y sé parte del cambio.";
  const keywords = "Fundación Solidarity Colombia eventos, próximos eventos, calendario, actividades, talleres, conferencias, voluntariado, impacto social";

  const imageUrl = "https://placehold.co/1200x630/6A5ACD/FFFFFF?text=Eventos+FSC";
  const siteUrl = "https://www.tudominio.com";

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/${locale}/eventos`,
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Eventos de Fundación Solidarity Colombia',
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      creator: '@TuTwitterHandle',
      images: [imageUrl],
    },
  };
}

export default async function EventsPage() {
  const { data }: EventRequest = await fetchAPI('/eventos');
  return (
    <section id="eventos" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100 animate-gradient-flow z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
          <span className="mr-3 text-4xl">🗓️</span> Próximos Eventos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  justify-items-center">
          {data.map((evento, index) => (
            <EventCard key={index} evento={evento} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-full shadow-lg
                       hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce"
          >
            Ver Todos los Eventos
          </button>
        </div>
      </div>
    </section>
  );
}
