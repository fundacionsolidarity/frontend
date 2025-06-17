"use client"; 
import Image from "next/image";;
import { Evento } from "@/app/eventos/interfaces/request-http";
import Carousel from "./Carousel";
import Link from "next/link";
import { truncateWords } from "../helpers/truncate-word";


interface EventoPreviewSliderProps {
  evento: Evento;
}

export default function EventoPreviewSlider({ evento }: EventoPreviewSliderProps) {
  if (!evento || !evento.imagen || evento.imagen.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-4">
        <Image
          src="/public/image-not-found.png"
          alt="Imagen no disponible"
          width={500}
          height={500}
          className="rounded-xl mb-2 w-full h-48 object-cover"
        />
        <h3 className="text-xl font-semibold">{evento?.Titulo || 'Evento sin título'}</h3>
        <p className="text-sm text-gray-600">{evento?.descripcion?.slice(0, 100).concat('...') || 'Sin descripción'}...</p>
      </div>
    );
  }

  const hasMultipleImages = evento.imagen.length > 1;

  return (
    <div
      className="bg-white flex flex-col cursor-pointer items-center justify-center rounded-2xl shadow-xl p-6 text-center transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl animate-fade-in-up "
      style={{ animationDelay: `0.2s` }}
    >
      <div className=" d-flex justify-centers w-100 md:w-60 lg:w-50 xl:w-60 h-50 mb-2">
        <Carousel 
          hasMultipleImages={ hasMultipleImages }
          imgs={ evento.imagen }
          navigation={ true }
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{evento.Titulo}</h3>
      {/* <p className="text-purple-600 font-semibold text-sm mb-3">{evento.fecha?.getDay()  }</p> */}
      <p className="text-gray-600 text-sm leading-relaxed"> { truncateWords( evento.descripcion, 100 ) } </p>
      <Link
        href={`/eventos/${evento.documentId}`} // La ruta dinámica a la página de detalle, usando documentId
        className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full
                   shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Ver Detalles
      </Link>
    </div>
  );
}