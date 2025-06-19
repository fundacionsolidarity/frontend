'use client';
import { useRouter } from "next/navigation";
import {  SingleEvent } from "../interfaces/single-event-http";
import { Link } from "lucide-react";
import { formatDate } from "@/app/helpers/format-date";
import Carousel from "@/app/components/Carousel";

type Props = {
    dataProp: SingleEvent | null
}

export const  EventDetail = ( { dataProp }: Props ) => {

    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    }
    if( !dataProp.data ) return;
    const { data } = dataProp;
    
    if (!data) {
    return (
        <section className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 animate-gradient-flow z-0"></div>
        <div className="relative z-10 p-6 md:p-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Evento no encontrado</h2>
            <p className="text-gray-700">Parece que el evento que buscas no existe.</p>
            <Link 
                href="/eventos" 
                className="mt-6 inline-block px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">Volver a Eventos</Link>
        </div>
        </section>
    );
  }

  return (
    <section className="relative p-8 md:p-12 lg:p-16 min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-gradient-flow z-0"></div>
      <div className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <button onClick={ handleGoBack } className="absolute top-6 left-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center">
          <span className="mr-2">⬅️</span> Volver
        </button>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mt-12 mb-8 tracking-tight">
          {data.Titulo || 'Evento sin título'}
        </h2>
        {data.imagen && data.imagen.length > 0 && (
          <div className='flex justify-center'>
            <div className="w-100 h-72 md:h-96 mb-8 overflow-hidden rounded-2xl shadow-lg">

              <Carousel 
                  imgs={data.imagen} 
                  hasMultipleImages={data.imagen.length > 1}
                  navigation={true}
              />
            </div>
          </div>
        )}
        {data.fecha && (
          <p className="text-purple-600 font-semibold text-lg text-center mb-6">
            Fecha: { formatDate( data.fecha ) }
          </p>
        )}
        {data.descripcion && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Más detalles:</h3>
            <p className="text-gray-700 leading-relaxed">{data.descripcion}</p>
          </div>
        )}
      </div>
    </section>
  );
}