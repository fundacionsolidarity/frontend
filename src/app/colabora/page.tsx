import ColaboraForm from "./components/ColaboraForm";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const title = "Colabora con Nosotros - Fundación Solidarity Colombia";
  const description = "Descubre cómo puedes apoyar la misión de la Fundación Solidarity Colombia a través de donaciones, voluntariado y alianzas. Tu ayuda transforma vidas.";
  const keywords = "Fundación Solidarity Colombia, colaborar, donar, donaciones, voluntariado, voluntarios, alianzas, apoyo, impacto social";

  const imageUrl = "https://placehold.co/1200x630/FFDDC1/FFFFFF?text=Colabora+FSC";
  const siteUrl = "https://www.tudominio.com";

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/${locale}/colabora`,
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Colabora con Fundación Solidarity Colombia',
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

export default function ColaboraPage() {
    return (
        <ColaboraForm />
    )
}
