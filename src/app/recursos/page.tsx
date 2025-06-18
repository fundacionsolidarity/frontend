import AllResources from './components/AllResources';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const title = "Recursos - Fundación Solidarity Colombia";
  const description = "Explora los recursos de la Fundación Solidarity Colombia: guías, informes, videos y enlaces útiles para conocer nuestro trabajo y unirte a la causa.";
  const keywords = "Fundación Solidarity Colombia, recursos, guías, informes, videos, enlaces útiles, materiales, documentos, apoyo social";

  const imageUrl = "https://placehold.co/1200x630/4CAF50/FFFFFF?text=Recursos+FSC";
  const siteUrl = "https://www.fsolidaritycolombia.org/";

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

  return (
    <AllResources />
  );
}
