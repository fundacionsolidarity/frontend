"use client"; // Este componente será un Client Component

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function DonationSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Activa la animación de confeti al cargar la página
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000); // Duración del confeti
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 p-6 overflow-hidden">
      {/* Animación de fondo sutil */}
      <div className="absolute inset-0 animate-gradient-flow z-0 opacity-70"></div>

      {/* Contenedor principal de la tarjeta de éxito */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-2xl mx-auto text-center transform transition-all duration-500 hover:scale-[1.01] animate-fade-in-up">
        {/* Icono de éxito */}
        <div className="mb-8 flex justify-center">
          <svg className="w-24 h-24 text-green-500 animate-checkmark-pop" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        {/* Mensaje de título */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          ¡Donación Exitosa! 🎉
        </h1>

        {/* Mensaje de agradecimiento */}
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          Tu generoso aporte ha sido recibido con éxito.
          <br />
          ¡Gracias por ser parte del cambio y por apoyar la misión de la Fundación Solidarity Colombia!
        </p>

        {/* Información adicional o próximos pasos (opcional) */}
        <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-800">
          <p className="text-sm">Recibirás un correo electrónico de confirmación con los detalles de tu donación en breve.</p>
        </div>

        {/* Botón para volver al inicio o a la sección de colaboración */}
        <Link
          href="/" // O "#colabora" si prefieres volver a la sección de colabora
          className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-lg
                     hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce"
        >
          Volver al Inicio
        </Link>
      </div>

      {/* Confeti (elementos visuales, puedes usar una librería de confeti si quieres algo más elaborado) */}
      {showConfetti && (
        <>
          <div className="confetti absolute top-0 left-0 w-4 h-4 bg-red-400 rounded-full animate-confetti" style={{ animationDelay: '0s' }}></div>
          <div className="confetti absolute top-1/4 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-confetti" style={{ animationDelay: '0.5s' }}></div>
          <div className="confetti absolute bottom-1/2 left-1/3 w-5 h-5 bg-yellow-400 rounded-full animate-confetti" style={{ animationDelay: '1s' }}></div>
          <div className="confetti absolute top-1/2 left-1/4 w-4 h-4 bg-green-400 rounded-full animate-confetti" style={{ animationDelay: '1.5s' }}></div>
          <div className="confetti absolute bottom-0 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-confetti" style={{ animationDelay: '2s' }}></div>
        </>
      )}

      {/* Estilos para las animaciones (normalmente irían en globals.css o un archivo CSS module) */}
      <style jsx global>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow {
          background-size: 400% 400%;
          animation: gradient-flow 30s ease infinite;
        }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }

        @keyframes button-bounce {
            0%, 100% { transform: translateY(0); }
            20% { transform: translateY(-5px); }
            40% { transform: translateY(0); }
            60% { transform: translateY(-2px); }
            80% { transform: translateY(0); }
        }
        .animate-button-bounce { animation: button-bounce 2s ease-out infinite; }

        @keyframes checkmark-pop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-checkmark-pop { animation: checkmark-pop 0.8s ease-out forwards; }

        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(calc(100vh + 50px)) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 4s ease-out forwards;
          position: absolute;
          animation-iteration-count: 1; /* Para que no se repita infinitamente */
        }
      `}</style>
    </section>
  );
}
