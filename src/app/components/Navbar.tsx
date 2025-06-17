// components/Navbar.tsx
"use client";

import { useState } from "react";
import { NavItem } from "../interfaces/types";
import Link from "next/link";




export default function Navbar() {
  const navItems = [
    { path: '/', name: 'Inicio' },
    { path: '/sobre-nosotros', name: 'Sobre Nosotros' },
    { path: '/eventos', name: 'Eventos' },
    { path: '/recursos', name: 'Recursos' },
    { path: '/testimonios', name: 'Testimonios' },
    { path: '/blog', name: 'Blog' },
    { path: '/contacto/', name: 'Contacto' },
    { path: '/colabora', name: 'Colabora' },
  ];

  const [activeLink, setActiveLink] = useState<NavItem>();

  return (
    <nav className="bg-white sticky top-0 z-20 shadow-lg rounded-b-xl">
      <div className="container mx-auto px-4 py-3 flex justify-center flex-wrap gap-2 md:gap-4 text-sm md:text-base">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={ item.path } 
            className={`
              relative px-5 py-2 rounded-lg transition-all duration-300
              ${activeLink?.path === item.path
                ? 'text-purple-700 font-semibold bg-purple-100 shadow-inner'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }
              group overflow-hidden
            `}
            onClick={() => setActiveLink(item)}
          >
            {item.name}
            {/* Animación de subrayado al pasar el ratón */}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            {/* Pequeño icono animado para el enlace activo */}
            {activeLink?.path === item.path && (
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 text-purple-500 animate-pulse-slight">
                ⭐
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );

}
