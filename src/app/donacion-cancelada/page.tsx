
import {CancelledPage} from './CancelledPage';

export async function generateMetadata() {

  const title = "Donación Cancelada - Fundación Solidarity Colombia";
  const description = "Tu donación ha sido cancelada. Si necesitas ayuda o tienes preguntas, por favor contáctanos.";
  const keywords = "donación cancelada, error donación, Fundación Solidarity Colombia, ayuda, contacto";
  
  const imageUrl = "https://placehold.co/1200x630/FF5733/FFFFFF?text=Donacion+Cancelada"; 
  const siteUrl = "https://www.fsolidaritycolombia.org/"; // 

  return {
    title: title,
    description: description,
    keywords: keywords,
    
    // Configuración para Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/donacion-cancelada`, // URL de esta página específica
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl, // URL absoluta de la imagen
          width: 1200,
          height: 630,
          alt: 'Donación Cancelada - Fundación Solidarity Colombia',
        },
      ],
      // locale: locale, // Descomentar si usas 'locale'
      type: 'website', // Indica que es un sitio web
    },

    // Configuración para Twitter Cards
    twitter: {
      card: 'summary_large_image', // Tipo de tarjeta de Twitter
      title: title,
      description: description,
      creator: '@TuTwitterHandle', // Opcional: Tu handle de Twitter si tienes uno para la fundación
      images: [imageUrl], // URL de la imagen
    },
  };
}

export default function DonationCancelledPage() {
  return(
    <CancelledPage />
  )
}
