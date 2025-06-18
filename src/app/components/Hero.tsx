import { type Hero } from "../interfaces/hero";
import { fetchAPI } from "../lib/api";

// components/Hero.tsx
export default async function Hero() {
  const { data }: Hero = await fetchAPI('/banner-principal')
  return (
    <section id="inicio" className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden text-center p-4">
      {/* Fondo de gradiente dinámico para la sección de inicio */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 animate-gradient-flow z-0"></div>

      {/* Elementos decorativos flotantes de la sección principal */}
      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-pink-300 opacity-30 rounded-full animate-float-one"></div>
      <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-purple-300 opacity-25 rounded-xl animate-float-two"></div>
      <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-yellow-300 opacity-20 rounded-full animate-float-three"></div>
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-green-300 opacity-20 rounded-lg animate-float-one delay-500"></div>


      <div className="relative z-10 max-w-3xl mx-auto space-y-6 animate-fade-in-up">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight drop-shadow-lg animate-text-pop-in">
          {data.titulo || "Bienvenido a nuestro espacio"}
        </h2>
        <p className="text-lg md:text-xl text-gray-800 opacity-90 drop-shadow-md animate-fade-in-up delay-500">
          {data.subtitulo || "Un lugar donde la comunidad se une para crecer y aprender juntos."}
        </p>
        <a
          href={  data.cta_link || "#"}
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-gray-800 font-bold text-lg rounded-full shadow-lg
                    hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 ease-in-out
                    animate-button-bounce"
        >
          {data.cta_text || "Descubre más"}
        </a>
      </div>
    </section>
  );
}
