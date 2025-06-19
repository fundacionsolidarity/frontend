'use client';
import { useState, useEffect } from 'react';
import { Evento, EventRequest } from '../eventos/interfaces/request-http';
import { fetchAPI } from '../lib/api';
import EventoPreviewSlider from './EventoPreview';

const MockLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);




const FeaturedEventsSection = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        setLoading(true);
        // Simular una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un retraso de 1 segundo

        // Filtrar solo los eventos con 'destacado: true'
        const { data }: EventRequest = await fetchAPI('/eventos', {
                'filters[destacado][$eq]': true,
        });
        setFeaturedEvents(data);
        setError(null); // Limpiar cualquier error previo
      } catch (err) {
        console.error("Error al cargar eventos destacados:", err);
        setError("No se pudieron cargar los eventos destacados.");
        setFeaturedEvents([]); // Asegurarse de que no haya eventos si hay un error
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvents();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  return (
    <section className="py-16 bg-gray-50 font-inter px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 animate-fade-in-down">
          Eventos Destacados
        </h2>

        {loading && (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-700">Cargando eventos...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 text-lg py-10">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && featuredEvents.length === 0 && (
          <div className="text-center text-gray-600 text-lg py-10">
            <p>No hay eventos destacados disponibles en este momento.</p>
          </div>
        )}

        {!loading && !error && featuredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto justify-center mb-12">
            {featuredEvents.map((event, id) => (
              <EventoPreviewSlider 
                key={id}
                evento={event}
              />
            ))}
          </div>
        )}

        <div className="text-center">
          <MockLink
            href="/todos-los-eventos" // Reemplaza con la URL real de tu página de todos los eventos
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold text-lg rounded-full shadow-lg
                       hover:from-purple-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Ver Todos los Eventos
          </MockLink>
        </div>
      </div>

      {/* Estilos CSS para animaciones (incluye la fuente Inter) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800&display=swap');

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
          opacity: 0; /* Oculto por defecto para la animación */
        }
      `}</style>
    </section>
  );
};

export default FeaturedEventsSection;
