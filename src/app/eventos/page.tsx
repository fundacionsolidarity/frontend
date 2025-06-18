import AllEvents from './components/AllEvents'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const title = "Eventos - Fundación Solidarity Colombia";
  const description = "Descubre los próximos eventos y actividades pasadas de la Fundación Solidarity Colombia. Únete a nuestras iniciativas y sé parte del cambio.";
  const keywords = "Fundación Solidarity Colombia eventos, próximos eventos, calendario, actividades, talleres, conferencias, voluntariado, impacto social";

  const imageUrl = "https://placehold.co/1200x630/6A5ACD/FFFFFF?text=Eventos+FSC";
  const siteUrl = "https://www.fsolidaritycolombia.org/";

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
  return (
    <AllEvents />
  );
}
