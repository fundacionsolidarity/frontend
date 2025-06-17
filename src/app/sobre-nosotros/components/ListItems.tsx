import React from 'react';

import {
  ObjectivosEspecificoChild, 
} from './../interfaces/http';




export const renderListItems = (items: ObjectivosEspecificoChild[]) => {
    return items.map((item, idx) => {
      if (item.type === "list-item" && item.children) {
        const textContent = item.children.map(child => child.text).join('');
        const isBold = item.children.some(child => child.bold);

        return (
          // Aplica list-none solo si es un título de categoría (isBold)
          <li key={idx} className={`mb-2 text-gray-700 text-base md:text-lg ${isBold ? 'list-none' : ''}`}>
            {isBold ? (
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                {/* El emoji ya viene en textContent */}
                {textContent}
              </h3>
            ) : (
              // Para los elementos de lista anidados, mantenemos la viñeta de Tailwind por defecto (o puedes agregar un <span> personalizado aquí si quieres un estilo diferente)
              <div className="flex items-start">
                 {/* Si quisieras una viñeta personalizada para los sub-items, la agregarías aquí: */}
                 {/* <span className="mr-2 text-blue-500">•</span>  */}
                {textContent}
              </div>
            )}
            {/* Si hay listas anidadas, renderizarlas recursivamente */}
            {item.children.some(child => child.type === "list") && (
              <ul className="ml-6 mt-2">
                {renderListItems(item.children.find(child => child.type === "list").children || [])}
              </ul>
            )}
          </li>
        );
      } else if (item.type === "list" && item.children) {
        // Esto maneja la lista de nivel superior y las anidadas.
        // La clase 'list-none' es importante para que Tailwind CSS no ponga sus propios bullets
        // por defecto a la UL, dejando que cada LI decida si muestra el suyo.
        return <ul key={idx} className="list-none p-0 m-0">{renderListItems(item.children)}</ul>;
      }
      return null;
    });
};
