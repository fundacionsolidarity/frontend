import Image from "next/image";
import { renderRichText } from "./components/RenderRichText";
import { fetchAPI } from "@/app/lib/api";

import Link from "next/link";
import { truncateWords } from "@/app/helpers/truncate-word";
import { SingleNoticia } from "./interfaces/single-noticia";
import type { Metadata } from 'next'; 


export async function generateMetadata({ params }: { params: { id: string; } }): Promise<Metadata> {
  const { id } = params;
  const { data }:SingleNoticia = await fetchAPI('/noticias/' + id);
  const blogPost = data;

  const siteUrl = "https://www.fsolidaritycolombia.org/";

  if (!blogPost) {
    return {
      title: "Blog Post no encontrado - Fundación Solidarity Colombia",
      description: "El artículo del blog que buscas no existe o ya no está disponible.",
      openGraph: {
        url: `${siteUrl}/blog/${id}`,
        type: 'website',
      },
    };
  }

  const defaultImageUrl = "https://placehold.co/1200x630/CCCCCC/FFFFFF?text=Blog+Post+FSC";
  const imageUrl = blogPost.imagen?.[0]?.formats?.large?.url || blogPost.imagen?.[0]?.url || defaultImageUrl;
  const imageWidth = blogPost.imagen?.[0]?.formats?.large?.width || 1200;
  const imageHeight = blogPost.imagen?.[0]?.formats?.large?.height || 630;
  const imageAlt = `Imagen para ${blogPost.titulo}`;

  const descriptionText = blogPost.contenido?.[0]?.children?.[0]?.text;

  return {
    title: `${blogPost.titulo} - Blog Fundación Solidarity Colombia`,
    description: truncateWords(descriptionText, 160),
    keywords: blogPost.tags ? blogPost.tags.split(',').map(tag => tag.trim()).join(', ') : 'blog, noticias, artículos, fundación, solidaridad, Colombia',
    openGraph: {
      title: `${blogPost.titulo} - Blog Fundación Solidarity Colombia`,
      description: truncateWords(descriptionText, 200),
      url: `${siteUrl}/blog/${blogPost.documentId}`,
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
      locale: 'es',
      type: 'article',
      publishedTime: blogPost.publishedAt ? new Date(blogPost.publishedAt).toISOString() : undefined,
      modifiedTime: blogPost.updatedAt ? new Date(blogPost.updatedAt).toISOString() : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blogPost.titulo} - Blog Fundación Solidarity Colombia`,
      description: truncateWords(descriptionText, 160),
      creator: '@TuTwitterHandle',
      images: [imageUrl],
    },
  };
}

interface NoticiaDetailPageParams {
  id: string;
}

const NoticiaDetailPage = async (params: NoticiaDetailPageParams):Promise<any> => {
  const { data }: SingleNoticia = await fetchAPI(`/noticias/${params.id}`);
  const noticia = data;

  if (!noticia) {
    return (
      <section className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 animate-gradient-flow z-0"></div>
        <div className="relative z-10 p-6 md:p-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Noticia no encontrada</h2>
          <p className="text-gray-700">Parece que la noticia que buscas no existe o ha sido eliminada.</p>
          <Link
            href="/blog"
            className="mt-6 inline-block px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
          >
            Volver al Blog
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(data.fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const imageUrl = noticia.imagen?.[0]?.formats?.large?.url || noticia.imagen?.[0]?.url || 'https://placehold.co/1200x600/CCCCCC/FFFFFF?text=Imagen+Noticia';

  return (
    <section className="relative p-8 md:p-12 lg:p-16 min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-gradient-flow z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <Link
          href='/blog'
          className="absolute top-6 left-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center"
        >
          <span className="mr-2">⬅️</span> Volver al Blog
        </Link>

        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mt-12 mb-6 tracking-tight leading-tight">
          {noticia.titulo}
        </h1>
        <p className="text-gray-500 text-sm text-center mb-8">
          Publicado el {formattedDate}
          {noticia.tags && <span className="ml-4 inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{noticia.tags}</span>}
        </p>
        {noticia.imagen && noticia.imagen.length > 0 && (
          <div className="w-full h-auto max-h-[500px] mb-8 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={imageUrl}
              alt={noticia.titulo}
              className="w-full h-full object-cover object-center"
              width={1200}
              height={600}
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {renderRichText(noticia.contenido)}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg
                       hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Volver al Blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NoticiaDetailPage;
