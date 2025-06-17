import DonationSuccessPage from "./components/Success"


export async function generateMetadata( ) {

  const title = "¡Donación Exitosa! - Fundación Solidarity Colombia";
  const description = "Tu generoso aporte ha sido recibido con éxito. ¡Gracias por tu apoyo a la Fundación Solidarity Colombia!";
  const keywords = "donación exitosa, gracias por donar, Fundación Solidarity Colombia, ayuda, apoyo, impacto social";
  
  const imageUrl = "https://placehold.co/1200x630/4CAF50/FFFFFF?text=Donacion+Exitosa"; 
  const siteUrl = "https://www.tudominio.com"; // **IMPORTANTE: Reemplaza con la URL base de tu sitio web**

  return {
    // Título principal de la página (aparece en la pestaña del navegador)
    title: title,
    // Descripción meta para los motores de búsqueda
    description: description,
    // Palabras clave relevantes
    keywords: keywords,
    
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/donacion-exitosa`, // URL de esta página específica
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl, // URL absoluta de la imagen
          width: 1200,
          height: 630,
          alt: 'Donación Exitosa - Fundación Solidarity Colombia',
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


export default function DonacionExitosa() {

    return(
        <DonationSuccessPage />
    );

}