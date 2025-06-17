import ContactFormComponent from './components/ContactForm'
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const title = "Contacto - Fundación Solidarity Colombia";
  const description = "Envíanos un mensaje, haz preguntas o contáctanos para colaborar con la Fundación Solidarity Colombia. ¡Estamos aquí para ayudarte!";
  const keywords = "Fundación Solidarity Colombia contacto, formulario de contacto, preguntas, colaborar, ayuda, información";

  const imageUrl = "https://placehold.co/1200x630/B0E0E6/FFFFFF?text=Contacto+FSC"; 
  const siteUrl = "https://www.tudominio.com"; 

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/${locale}/contacto`,
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Contacto Fundación Solidarity Colombia',
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

export default async function ContactForm() {
    return (
        <>
            <ContactFormComponent />
        </>
    );
}