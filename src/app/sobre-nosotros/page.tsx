// app/[locale]/about/page.tsx

import TeamCard from "@/app/components/TeamCard";
import React from "react";
import { fetchAPI } from "../lib/api";
import { SobreNosotrosRequest } from "./interfaces/http";
import { EquipoRequest } from "../interfaces/equipo";
import { renderListItems } from "./components/ListItems";
import { SparkleSVG } from "../components/sparkleSVG";
import { GrowingPlantSVG } from "../components/GrowingPlantSVG";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const title = "Sobre Nosotros - Fundación Solidarity Colombia";
  const description = "Conoce la misión, visión, historia y el equipo detrás de la Fundación Solidarity Colombia. Descubre cómo empoderamos a niñas y jóvenes en situación de vulnerabilidad.";
  const keywords = "Fundación Solidarity Colombia, misión, visión, historia, equipo, valores, impacto social, empoderamiento, vulnerabilidad, Colombia";
  const imageUrl = "https://placehold.co/1200x630/6A5ACD/FFFFFF?text=Sobre+Nosotros+FSC";
  const siteUrl = "https://www.tudominio.com";

  return {
    title: title,
  
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/${locale}/sobre-nosotros`,
      siteName: 'Fundación Solidarity Colombia',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Equipo y Misión de Fundación Solidarity Colombia',
        },
      ],
      locale: locale,
      type: 'article', 
    },

  };
}

export default async function AboutPage() {

  const { data }:SobreNosotrosRequest = await fetchAPI('/pagina-nosotros');
  const dataEquipo :EquipoRequest = await fetchAPI('/equipos');
  const equipo =dataEquipo.data;

  const historias = data.historia
                        .map( history => history.children )

  return(
    <section className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Fondo de gradiente animado sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-gradient-flow z-0"></div>

      {/* Ilustraciones sutiles en el fondo */}
      <GrowingPlantSVG />
      <SparkleSVG />

      {/* Contenido principal de Misión y Visión */}
      <div className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl space-y-8 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          Sobre Nosotros
        </h2>

        {
          historias[0][0].text !== '' && <div className="mb-10">
                                            <h2 className="text-2xl font-semibold mb-2">Nuestra Historia</h2>
                                            <p className="text-gray-700">
                                              { data.historia[0]?.children[0]?.text }
                                            </p>
                                          </div>
        }

        {/* Sección Misión */}
        <div className="relative p-4 md:p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-inner transform transition-transform duration-300 hover:scale-[1.01]">
          <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center">
            <span className="mr-2 text-3xl">🎯</span> Misión
          </h3>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
          { data.Mision[0]?.children[0]?.text }
          </p>
        </div>

        {/* Sección Visión */}
        <div className="relative p-4 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-inner transform transition-transform duration-300 hover:scale-[1.01]">
          <h3 className="text-2xl font-bold text-purple-700 mb-3 flex items-center">
            <span className="mr-2 text-3xl">✨</span> Visión
          </h3>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            { data.vision[0]?.children[0]?.text }
          </p>
        </div>

        <div id="objetivo-general" className="relative p-8 md:p-12 lg:p-16 min-h-[400px] flex items-center justify-center overflow-hidden">
          {/* Fondo de gradiente animado sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 animate-gradient-flow z-0"></div>

          <div className="relative z-10 max-w-3xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 tracking-tight flex items-center justify-center">
              <span className="mr-3 text-4xl">🌟</span> Objetivo General
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              { data.objetivo_general[0].children[0].text }
            </p>
          </div>
        </div>

        <section id="objetivos-especificos" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col items-center justify-center overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 animate-gradient-flow z-0"></div>

          <div className="relative z-10 max-w-5xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
              <span className="mr-3 text-4xl">🎯</span> Objetivos Específicos
            </h2>
            <div className="space-y-8"> {/* Contenedor para las categorías de objetivos */}
              { data.objectivos_especificos.map((category, index) => (
                <div
                  key={index}
                  className="p-5 bg-white rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-[1.01] animate-fade-in-up"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  {renderListItems(category.children)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="nuestro-equipo" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
          {/* Fondo de gradiente animado sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-indigo-100 animate-gradient-flow z-0"></div>

          <div className="relative z-10 max-w-6xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
              <span className="mr-3 text-4xl">👨‍👩‍👧‍👦</span> Nuestro Equipo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 md:gap-8 justify-items-center">
              {equipo.map((member, index) => (
                <TeamCard 
                  imageUrl={ member.Foto[0].url }
                  name={  member.Nombre}
                  role={ member.Cargo }
                  description={ member.Biografia[0].children[0].text }
                  key={ index }
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
                      
}
