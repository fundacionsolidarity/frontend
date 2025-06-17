import { fetchAPI } from "../lib/api";
import { ResourceHTTP } from "./interfaces/request-http";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const title = "Recursos - Fundación Solidarity Colombia";
  const description = "Explora los recursos de la Fundación Solidarity Colombia: guías, informes, videos y enlaces útiles para conocer nuestro trabajo y unirte a la causa.";
  const keywords = "Fundación Solidarity Colombia, recursos, guías, informes, videos, enlaces útiles, materiales, documentos, apoyo social";

  const imageUrl = "https://placehold.co/1200x630/4CAF50/FFFFFF?text=Recursos+FSC";
  const siteUrl = "https://www.tudominio.com";

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/${locale}/recursos`,
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Recursos de Fundación Solidarity Colombia',
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


export default async function RecursosPage() {

  const { data }: ResourceHTTP = await fetchAPI('/recursos');
  
  const resources = data.map((item) => {
    const { id, titulo, descripcion, categoria, archivo } = item;

    let type = 'otro';
    let icon = 'ℹ️'; 

    switch (categoria) {
      case 'DOCUMENTO':
        type = 'document';
        icon = '📄';
        break;
      case 'VIDEO':
        type = 'video';
        icon = '▶️';
        break;
      case 'WEB_LINK':
        type = 'web-link';
        icon = '🔗';
        break;
      case 'IMAGEN_GALERIA':
        type = 'image';
        icon = '🖼️';
        break;
      case 'INFORME':
        type = 'document';
        icon = '📊';
        break;
      case 'BLOG_POST':
        type = 'web-link';
        icon = '✍️';
        break;
      default:
        type = 'otro';
    }

    return {
      id,
      type,
      title: titulo,
      description: descripcion,
      icon,
      link: archivo.length > 0 ? archivo[0].url : '#', // Usar el primer archivo como enlace
    };
  })


  const getCardClasses = (type: string) => {
    switch (type) {
      case 'document':
        return 'from-blue-100 to-blue-200 hover:shadow-blue-300';
      case 'web-link':
        return 'from-green-100 to-green-200 hover:shadow-green-300';
      case 'video':
        return 'from-purple-100 to-purple-200 hover:shadow-purple-300';
      case 'image':
        return 'from-yellow-100 to-yellow-200 hover:shadow-yellow-300';
      default:
        return 'from-gray-100 to-gray-200 hover:shadow-gray-300';
    }
  };

  return (
    <section id="recursos" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Fondo de gradiente animado sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 animate-gradient-flow z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
          <span className="mr-3 text-4xl">📚</span> Nuestros Recursos
        </h2>
        <p className="text-center text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
          Explora nuestra colección de materiales y documentos valiosos que pueden ayudarte a conocer, actuar y compartir el impacto de nuestra fundación.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {resources.map((resource, index) => (
            <div
              key={resource.id}
              className={`bg-gradient-to-br ${getCardClasses(resource.type)} rounded-2xl shadow-lg p-6 text-center
                         transform transition-all duration-300 hover:scale-105 hover:shadow-xl-lg animate-fade-in-up`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="text-6xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                {resource.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full
                           shadow-md hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Ver Recurso
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-full shadow-lg
                       hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce"
          >
            Explorar Más Recursos
          </button>
        </div>
      </div>
    </section>
  );
}
