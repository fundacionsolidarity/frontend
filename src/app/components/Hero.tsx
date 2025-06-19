import Link from "next/link";
import { type Hero } from "../interfaces/hero";
import { fetchAPI } from "../lib/api";
// import Carousel from "./Carousel";
import { Carousel } from './CarouselHero';

export default async function Hero() {
  const {data}: Hero = await fetchAPI('/hero');


  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-900 font-inter">
      <div className="absolute inset-0">
        <Carousel
          pagination={true}
          imgs={data.carousel_images}
          navigation={true}
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/70 to-black/90"></div>

      <div className="relative z-30 text-white text-center p-6 md:p-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4
                       drop-shadow-lg animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}>
          { data.title }
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light mb-8
                      drop-shadow-md animate-fade-in-up"
           style={{ animationDelay: '0.4s' }}>
          { data.subtitle }
        </p>
        <Link
          href={ data.cta_link }
          className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold text-lg rounded-full shadow-xl
                     hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out
                     animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          { data.cta_text }
        </Link>
      </div>

  
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800&display=swap');

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0; /* Oculto por defecto para la animación */
        }
      `}</style>
    </section>
  );
}
