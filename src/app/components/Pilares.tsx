import { PilaresRequest } from "../interfaces/pilare-http";
import { fetchAPI } from "../lib/api";

export const Pilares = async () => {
  
  const { data }: PilaresRequest = await fetchAPI('/pilares');

  return (
    <section id="nuestros-pilares" className="relative p-8 md:p-12 lg:p-16 bg-white overflow-hidden text-center">
      {/* Fondo de gradiente sutil y formas suaves */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50 z-0 animate-gradient-flow-alt"></div>
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-100 opacity-40 rounded-full animate-float-one delay-100"></div>
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-yellow-100 opacity-40 rounded-xl animate-float-two delay-200"></div>


      <div className="relative z-10 max-w-6xl mx-auto animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 tracking-tight flex items-center justify-center">
          <span className="mr-3 text-4xl">🌈</span> Nuestros Pilares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((pilar, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                         flex flex-col items-center justify-center animate-fade-in-up"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <span className="text-5xl mb-4">{pilar.Icon}</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{pilar.title}</h3>
              {
                pilar.subtitle.map((sub, subIndex) => (
                  <p 
                    key={subIndex} 
                    className="text-gray-600 text-sm leading-relaxed"
                  >
                    { sub['children'][0].text || "Subtítulo no disponible" }
                  </p> 
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};