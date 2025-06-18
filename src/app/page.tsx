
import Hero from "@/app/components/Hero";;
import { Pilares } from "./components/Pilares";
import { HistoriasInspiradorasSection } from "./components/HistoriasInspiradorasSection";
import { CallToActionSection } from "./components/CallToActionSection";

export async function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" },
  ];
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const title = "Fundación Solidarity Colombia - Juntas somos más fuertes";
  const description = "La Fundación Solidarity Colombia empodera y transforma la vida de niñas y jóvenes en situación de vulnerabilidad a través de educación y programas sociales. Conoce nuestra misión, eventos y cómo colaborar.";
  const keywords = "Fundación Solidarity Colombia, empoderamiento femenino, educación para niñas, jóvenes vulnerables, proyectos sociales, voluntariado, donaciones, Colombia";
  
  const imageUrl = 'https://placehold.co/1200x630/4CAF50/FFFFFF?text=Fundacion+Solidarity+Colombia'; 
  const siteUrl = "https://www.fsolidaritycolombia.org/"; 


  return {

    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/${locale}`,
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl, 
          width: 1200,
          height: 630,
          alt: 'Fundación Solidarity Colombia - Empoderando vidas',
        },
      ],
      locale: locale, 
      type: 'website', 
    },


  };
}


export default async function Home() {
  return (
    <>
      <Hero />
      <Pilares />
      <HistoriasInspiradorasSection />
      <CallToActionSection />
    </>
  );
}
