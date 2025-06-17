import { TestimonioRequest } from "../testimonios/interfaces/testimonios-http";
import { fetchAPI } from "../lib/api";
import Link from "next/link";

export const HistoriasInspiradorasSection = async () => {
  const { data } : TestimonioRequest = await fetchAPI('/testimonios');
  const historias = data.slice(0, 3)

  return (
    <section id="historias-inspiradoras" className="relative p-8 md:p-12 lg:p-16 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden text-center">
      <div className="relative z-10 max-w-6xl mx-auto animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 tracking-tight flex items-center justify-center">
          <span className="mr-3 text-4xl">📚</span> Historias Inspiradoras
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {historias.map((historia, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 cursor-pointer transform transition-all duration-300 hover:scale-103 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
                  <div className="text-6xl mb-4 text-purple-600 transform transition-transform duration-300 group-hover:scale-110">
            {  historia.icon }
          </div>
              {
                historia.text.map((text, idx) => (
                  <p 
                    key={ idx } className="p-4 text-gray-700 text-sm md:text-base"
                  >
                    {text['children'][0].text}
                  </p>
                ))
              }
              
            </div>
          ))}
        </div>
        <Link
          href="/testimonios"
          className="mt-10 px-8 inline-block cursor-pointer py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-full shadow-lg
                     hover:from-indigo-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce"
        >
          Ver Más Historias
        </Link>
      </div>
    </section>
  );
};