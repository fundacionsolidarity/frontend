'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { fetchAPI } from '@/app/lib/api';
import { truncateWords } from '@/app/helpers/truncate-word';
import { NoticiaRequest } from '../../interfaces/strapi';
import { Noticia } from '../interfaces/noticia-http';


const AllPosts = ( ) => {
  const [activeTag, setActiveTag] = useState<string>(''); 
  const [ blogPosts, setBlogPosts ] = useState<Noticia[]>([]);

  useEffect(() => {

    const fetchBlogPosts = async () => {
      const { data }: NoticiaRequest = await fetchAPI('/noticias');
      setBlogPosts( data );
    }
    fetchBlogPosts();

  }, []);

  const filteredPosts = activeTag
    ? blogPosts.filter(post => post.tags.includes(activeTag))
    : blogPosts;

  const allTags = blogPosts.map(post => post.tags).flat();
  const uniqueTags = Array.from(new Set(allTags));

  return (
    <section id="blog" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-gradient-flow z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
          <span className="mr-3 text-4xl">📰</span> Blog y Noticias
        </h2>
        <p className="text-center text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
          Mantente al día con nuestras campañas, noticias importantes y artículos inspiradores.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span
            className={`inline-block text-sm font-semibold px-4 py-2 rounded-full cursor-pointer
              ${activeTag === null ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}
              transition-colors duration-200 transform hover:scale-105 animate-fade-in-up`}
            onClick={() => setActiveTag('')}
          >
            #todos
          </span>
          {uniqueTags.map((tag, index) => (
            <span
              key={index}
              className={`inline-block text-sm font-semibold px-4 py-2 rounded-full cursor-pointer
                ${activeTag === tag ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}
                transition-colors duration-200 transform hover:scale-105 animate-fade-in-up`}
              style={{ animationDelay: `${0.05 * (index + 1)}s` }} 
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <Image
                  src={post.imagen[0].url}
                  alt={post.titulo}
                  width={ 200 }
                  height={200}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2"> 
                    {
                      new Date(post.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    }
                  </p>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{post.titulo}</h3>
                  
                    
                    <p 
                      className="text-gray-700 text-sm leading-relaxed mb-4"
                    >
                     {truncateWords( post.contenido[0].children[0].text, 20) }
                    </p>
                  
                  
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {post.tags || 'Sin Etiqueta'}
                  </span>
                  <Link
                    href={`/blog/${post.documentId}`} 
                    className="block text-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full
                               shadow-md hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    Leer Más
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No se encontraron publicaciones para esta categoría.</p>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg
                       hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce"
          >
            Ver Todas las Noticias
          </button>
        </div>
      </div>
    </section>
  );
}

export default AllPosts