
'use client';
import Link from 'next/link';

export const CancelledPage = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6 overflow-hidden">
      {/* Animación de fondo sutil */}
      <div className="absolute inset-0 animate-gradient-flow-alt z-0 opacity-70"></div>

      {/* Contenedor principal de la tarjeta de cancelación */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-2xl mx-auto text-center transform transition-all duration-500 hover:scale-[1.01] animate-fade-in-up">
        {/* Icono de cancelación/error */}
        <div className="mb-8 flex justify-center">
          <svg className="w-24 h-24 text-red-500 animate-x-pop" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        {/* Mensaje de título */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Donación Cancelada 😔
        </h1>

        {/* Mensaje de explicación */}
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          Tu intento de donación ha sido cancelado.
          <br />
          Si esto fue un error o necesitas ayuda, por favor contáctanos.
        </p>

        {/* Botón para volver al inicio o a la sección de colaboración */}
        <Link
          href="/" // O "#colabora" si prefieres volver a la sección de colabora
          className="inline-block px-10 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg rounded-full shadow-lg
                     hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce"
        >
          Volver al Inicio
        </Link>
      </div>

      {/* Estilos para las animaciones (normalmente irían en globals.css o un archivo CSS module) */}
      <style jsx global>{`
        @keyframes gradient-flow-alt {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow-alt {
          background-size: 400% 400%;
          animation: gradient-flow-alt 30s ease infinite alternate;
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

        @keyframes x-pop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-x-pop { animation: x-pop 0.8s ease-out forwards; }
      `}</style>
    </section>
  );
}