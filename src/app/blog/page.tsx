
import AllPosts from "./[slug]/components/AllPosts";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const title = "Historias que Inspiran - Fundación Solidarity Colombia";
  const description = "Descubre testimonios reales de niñas y jóvenes cuyas vidas han sido transformadas por los programas de la Fundación Solidarity Colombia.";
  const keywords = "Fundación Solidarity Colombia, historias inspiradoras, testimonios, impacto social, transformación de vidas, empoderamiento, éxito, Colombia";

  const imageUrl = "https://placehold.co/1200x630/FF8C00/FFFFFF?text=Historias+FSC"; // Imagen representativa para la sección de testimonios
  const siteUrl = "https://www.tudominio.com";

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

export default function BlogPage() {
  return(
    <AllPosts />
  );
}
