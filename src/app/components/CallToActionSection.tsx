import Link from "next/link";

export const CallToActionSection = () => {
  return (
    <section id="colabora" className="relative p-8 md:p-12 lg:p-16 bg-gradient-to-br from-orange-200 to-red-200 overflow-hidden text-center flex items-center justify-center">
      {/* Pequeños elementos flotantes en el fondo */}
      <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-white opacity-20 rounded-full animate-float-one-fast"></div>
      <div className="absolute bottom-1/2 right-1/4 w-8 h-8 bg-white opacity-15 rounded-full animate-float-two-fast"></div>

      <div className="relative z-10 max-w-2xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 tracking-tight">
          ¡Tu apoyo hace la diferencia!
        </h2>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-8">
          Únete a nuestra misión y ayúdanos a construir un futuro brillante para más niñas y jóvenes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="contacto"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-lg
                       hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce"
          >
            Contactanos
          </Link>
          <Link
            href="#contacto"
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full shadow-lg
                       hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-button-bounce"
          >
            Colabora
          </Link>
        </div>
      </div>
    </section>
  );
};