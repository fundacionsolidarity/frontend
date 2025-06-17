import AllPosts from "./[id]/components/AllPosts";
import type { Metadata } from 'next'; 



export async function generateMetadata(): Promise<Metadata> {
  // const { slug } = params; 

  const imageUrl = "https://placehold.co/1200x630/FF8C00/FFFFFF?text=Historias+FSC";
  const siteUrl = "https://www.tudominio.com"; 

  const title = `Historias que Inspiran - Fundación Solidarity Colombia - `; 
  const description = "Descubre testimonios reales de niñas y jóvenes cuyas vidas han sido transformadas por los programas de la Fundación Solidarity Colombia.";
  const keywords = "Fundación Solidarity Colombia, historias inspiradoras, testimonios, impacto social, transformación de vidas, empoderamiento, éxito, Colombia";

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/blog/`, 
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Historias que Inspiran de Fundación Solidarity Colombia',
        },
      ],

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

export default function BlogPage() {
  return(
    <AllPosts />
  );
}
