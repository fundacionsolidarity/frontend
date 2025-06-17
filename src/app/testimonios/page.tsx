import { fetchAPI } from "../lib/api";
import TestimonialCard from "../components/TestimonialCard";
import { TestimonioRequest } from "./interfaces/testimonios-http";


export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const title = "Historias que Inspiran - Fundación Solidarity Colombia";
  const description = "Descubre testimonios reales de niñas y jóvenes cuyas vidas han sido transformadas por los programas de la Fundación Solidarity Colombia.";
  const keywords = "Fundación Solidarity Colombia, historias inspiradoras, testimonios, impacto social, transformación de vidas, empoderamiento, éxito, Colombia";

  const imageUrl = "https://placehold.co/1200x630/FF8C00/FFFFFF?text=Historias+FSC"; // Imagen representativa para la sección de testimonios
  const siteUrl = "https://www.tudominio.com"; // IMPORTANTE: Reemplaza con la URL base de tu sitio web

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/${locale}/testimonios`, // Ajusta la URL de la página de testimonios
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Historias que Inspiran de Fundación Solidarity Colombia',
        },
      ],
      locale: locale,
      type: 'website', // o 'article' si cada testimonio es una subpágina
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      creator: '@TuTwitterHandle', // Opcional: Tu handle de Twitter si tienes uno
      images: [imageUrl],
    },
  };
}

export default async function HistoriasPage() {

  const { data }: TestimonioRequest = await fetchAPI('/testimonios');



  return (
    <section id="testimonios" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col items-center justify-center overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 animate-gradient-flow z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
          <span className="mr-3 text-4xl">💬</span> Historias que Inspiran
        </h2>
        <p className="text-center text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
          Escucha las voces de quienes han transformado su vida gracias al trabajo colectivo de nuestra comunidad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {data.map((testimonial, index) => (
            <TestimonialCard  
              key={ index }
              index={ index }
              icon={ testimonial.icon }
              messages={ testimonial.text }
              name={  testimonial.name || "Anónimo" }
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg
                       hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce"
          >
            Conoce Más Testimonios
          </button>
        </div>
      </div>
    </section>
  );
}
