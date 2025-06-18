'use client'; 

import { useState, useEffect, useCallback } from 'react';
import { Recurso, ResourceHTTP } from '../interfaces/request-http';
import { fetchAPI } from '@/app/lib/api';
import { ResourceCard } from './ResourceCard';

export default function RecursosPage() {
  const [resources, setResources] = useState<Recurso[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const PAGE_SIZE = 25; 

  const loadResources = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const { data, meta }: ResourceHTTP = await fetchAPI('/recursos', {
        'pagination[page]': pageNum,
        'pagination[pageSize]': PAGE_SIZE,
        sort: ['createdAt:desc'], 
      });

      if (pageNum === 1) {
        setResources(data); 
      } else {
        setResources((prevResources) => [...prevResources, ...data]);
      }
      setPageCount(meta.pagination.pageCount); 
      setPage(pageNum);
    } catch (error) {
      console.error("Error al cargar recursos:", error);

    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial de recursos cuando el componente se monta
  useEffect(() => {
    loadResources(1);
  }, [loadResources]); // Dependencia: loadResources para evitar bucles infinitos

  // Función para cargar más recursos
  const handleLoadMore = () => {
    if (page < pageCount && !loading) {
      loadResources(page + 1);
    }
  };

  // Determinar si el botón "Ver más recursos" debe mostrarse
  // Se muestra si la página actual es menor que el total de páginas
  const shouldShowLoadMoreButton = page < pageCount;

  return (
    <section id="recursos" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Fondo de gradiente animado sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 animate-gradient-flow z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
          <span className="mr-3 text-4xl">📚</span> Nuestros Recursos
        </h2>
        <p className="text-center text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
          Explora nuestra colección de materiales y documentos valiosos que pueden ayudarte a conocer, actuar y compartir el impacto de nuestra fundación.
        </p>

        {/* Mensajes de estado de carga y ausencia de recursos */}
        {loading && resources.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Cargando recursos...</p>
        ) : resources.length === 0 && !loading ? (
          <p className="text-center text-gray-600 text-lg">No hay recursos disponibles en este momento. Por favor, vuelve más tarde.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          {loading && resources.length > 0 && ( // Muestra "Cargando más recursos..." solo si ya hay recursos cargados
            <p className="text-gray-600 font-medium">Cargando más recursos...</p>
          )}

          {shouldShowLoadMoreButton && (
            <button
              onClick={handleLoadMore}
              disabled={loading} // Deshabilita el botón mientras se carga
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-full shadow-lg
                         hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ver más recursos
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
