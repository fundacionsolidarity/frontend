import { Recurso } from "../interfaces/request-http";

export const ResourceCard = ({ resource }: { resource: Recurso }) => {
  const { titulo, descripcion, categoria, archivo  } = resource;

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

  // Determinar el enlace del recurso
  const resourceLink =   (archivo?.length > 0 ? archivo[0].url : '#');

  const getCardClasses = (resourceType: string) => {
    switch (resourceType) {
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
    <div
      className={`bg-gradient-to-br ${getCardClasses(type)} rounded-2xl shadow-lg p-6 text-center
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl-lg animate-fade-in-up`}
      style={{ animationDelay: `0.1s` }} // Ajusta el delay si es necesario
    >
      <div className="text-6xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{titulo}</h3>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">{descripcion}</p>
      <a
        href={resourceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full
                   shadow-md hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Ver Recurso
      </a>
    </div>
  );
};