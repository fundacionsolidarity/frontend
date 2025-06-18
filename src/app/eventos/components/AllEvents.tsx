'use client'; 

import { useState, useEffect, useCallback } from 'react';
import { Evento, EventRequest } from '../interfaces/request-http';
import { fetchAPI } from '@/app/lib/api';
import EventoPreviewSlider from '@/app/components/EventoPreview';


export default function EventsPage() {
  const [events, setEvents] = useState<Evento[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false); 
  const PAGE_SIZE = 25; 

  // Función para cargar eventos
  const loadEvents = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const { data, meta }: EventRequest = await fetchAPI('/eventos', {
        'pagination[page]': pageNum,
        'pagination[pageSize]': PAGE_SIZE,
        sort: ['fecha:desc'], 
      });

      if (pageNum === 1) {
        setEvents(data); 
      } else {
        setEvents((prevEvents) => [...prevEvents, ...data]); 
      }
      setPageCount(meta.pagination.pageCount); 
      setPage(pageNum); 
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    loadEvents(1);
  }, [loadEvents]);
  const handleLoadMore = () => {
    if (page < pageCount && !loading) {
      loadEvents(page + 1);
    }
  };

  const shouldShowLoadMoreButton = page < pageCount;

  return (
    <section id="eventos" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100 animate-gradient-flow z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
          <span className="mr-3 text-4xl">🗓️</span> Próximos Eventos
        </h2>

        {loading && events.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Cargando eventos...</p>
        ) : events.length === 0 && !loading ? (
          <p className="text-center text-gray-600 text-lg">No hay eventos disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {events.map((evento) => (
              // Es mejor usar 'id' si es único y estable para la 'key'
              <EventoPreviewSlider key={evento.id} evento={evento} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          {loading && events.length > 0 && ( // Muestra "Cargando más eventos..." solo si ya hay eventos cargados
            <p className="text-gray-600 font-medium">Cargando más eventos...</p>
          )}

          {shouldShowLoadMoreButton && (
            <button
              onClick={handleLoadMore}
              disabled={loading} // Deshabilita el botón mientras se carga
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-full shadow-lg
                         hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ver más eventos
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
