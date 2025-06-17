import { fetchAPI } from "../lib/api";
import { FooterRequest } from "./interfaces/footer-request";


export default async function Footer() {

  const { data }: FooterRequest = await fetchAPI('/footer');
  const { email, Name, subtitulo, telefono }= data 

  return (
    <footer className="relative w-full bg-gradient-to-r from-yellow-400 to-orange-400 p-8 md:p-12 text-white rounded-t-xl shadow-inner overflow-hidden">
      {/* Elementos decorativos flotantes en el footer */}
      <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white opacity-10 rounded-full animate-float-one-fast"></div>
      <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-white opacity-15 rounded-full animate-float-two-fast"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left space-y-6 md:space-y-0 relative z-10">
        {/* Información de la Fundación */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="flex items-center mb-2">
            {/* <Image
              src="https://placehold.co/40x40/FFD700/FFFFFF?text=Logo" // Pequeño logo para el footer
              alt="Logo Fundación Solidarity Colombia"
              className="w-10 h-10 rounded-full mr-2"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/FFD700/FFFFFF?text=FSC'; }}
            /> */}
            <h3 className="text-xl font-bold"> { Name } </h3>
          </div>
          <p className="text-sm opacity-90 max-w-sm">
            { subtitulo }
          </p>
        </div>

        {/* Información de Contacto */}
        <div className="space-y-2 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Contacto</h4>
          <p className="flex items-center justify-center md:justify-start text-sm">
            <span className="mr-2 text-lg">📧</span> { email }
          </p>
          <p className="flex items-center justify-center md:justify-start text-sm">
            <span className="mr-2 text-lg">📞</span> { telefono }
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm opacity-80 mt-auto">
          &copy; 2025 Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
