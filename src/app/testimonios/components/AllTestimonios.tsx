'use client'; // ¡IMPORTANTE! Esto lo convierte en un Client Component

import { useState, useEffect, useCallback } from 'react';
import { TestimonioRequest, Testimonio } from '../interfaces/testimonios-http';
import { fetchAPI } from '@/app/lib/api';
import { TestimonialCard } from './TestimonialCard';



export default function HistoriasPage() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const PAGE_SIZE = 9; 

  // Función para cargar testimonios
  const loadTestimonios = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const { data, meta }: TestimonioRequest   = await fetchAPI('/testimonios', {
        'pagination[page]': pageNum,
        'pagination[pageSize]': PAGE_SIZE,
        sort: ['createdAt:desc'], 
      });

      if (pageNum === 1) {
        setTestimonios(data); 
      } else {
        setTestimonios((prevTestimonios) => [...prevTestimonios, ...data]); 
      }
      setPageCount(meta.pagination.pageCount); 
      setPage(pageNum);
    } catch (error) {
      console.error("Error al cargar testimonios:", error);
    
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial de testimonios cuando el componente se monta
  useEffect(() => {
    loadTestimonios(1);
  }, [loadTestimonios]); // Dependencia: loadTestimonios para evitar bucles infinitos

  // Función para cargar más testimonios
  const handleLoadMore = () => {
    if (page < pageCount && !loading) {
      loadTestimonios(page + 1);
    }
  };

  // Determinar si el botón "Conoce Más Testimonios" debe mostrarse
  const shouldShowLoadMoreButton = page < pageCount;

  return (
    <section id="testimonios" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Fondo de gradiente animado sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 animate-gradient-flow z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
          <span className="mr-3 text-4xl">💬</span> Historias que Inspiran
        </h2>
        <p className="text-center text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
          Escucha las voces de quienes han transformado su vida gracias al trabajo colectivo de nuestra comunidad.
        </p>

        {loading && testimonios.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Cargando historias inspiradoras...</p>
        ) : testimonios.length === 0 && !loading ? (
          <p className="text-center text-gray-600 text-lg">No hay historias disponibles en este momento. ¡Sé el primero en compartir la tuya!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {testimonios.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          {loading && testimonios.length > 0 && ( // Muestra "Cargando más historias..." solo si ya hay testimonios cargados
            <p className="text-gray-600 font-medium">Cargando más historias...</p>
          )}

          {shouldShowLoadMoreButton && (
            <button
              onClick={handleLoadMore}
              disabled={loading} // Deshabilita el botón mientras se carga
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg
                         hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Conoce Más Testimonios
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
