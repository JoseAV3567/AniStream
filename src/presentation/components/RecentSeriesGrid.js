// src/Components/RecentSeriesGrid.js
import React from "react";
import { Link } from "react-router-dom";

function RecentSeriesGrid({ mainTitle, subtitle, items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    // SECCIÓN PRINCIPAL: Añadimos un fondo oscuro aquí (bg-gray-900)
    <section className="w-full   text-[#e0e0e0] font-sans px-3 py-6 sm:px-4 sm:py-8">
      {/* Encabezado de la sección */}
      <div className="flex flex-col mb-8">
        <h2 className="font-bold text-[#5bcb72] mb-2 text-2xl md:text-3xl">
          {mainTitle}
        </h2>
        <p className="text-[#b0b0b0] text-sm md:text-base">
          {subtitle}{" "}
          <a
            href="/explore"
            className="text-[#5bcb72] no-underline font-medium transition-colors duration-200"
          >
            explorar
          </a>
        </p>
      </div>

      {/* Cuadrícula de tarjetas */}
      <ul
        className="
          list-none p-0 m-0 grid gap-y-6 gap-x-3 
          grid-cols-[repeat(auto-fill,minmax(150px,1fr))]
          sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] sm:gap-y-8 sm:gap-x-4
          md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-y-10 md:gap-x-6
          xl:grid-cols-6
        "
      >
        {items.map((item) => (
          // Tarjeta individual: Ya no tiene los efectos de hover
          <Link
            to={`/videos/detalle/${item.slug}`}
            className="block no-underline text-inherit"
          >
            <li
              key={item.title}
              className="bg-transparent rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Imagen de la tarjeta: AHORA LA SOMBRA Y TRANSICIÓN ESTÁN AQUÍ */}
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-md shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]">
                {/* Etiqueta de estado (ej. "En emisión") */}
                <div className="absolute top-0 left-0 bg-[#5bcb72] text-white px-3 py-1 text-sm font-bold uppercase rounded-br-md">
                  {item.status}
                </div>

                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover block"
                />
              </div>
              {/* Información de la tarjeta */}
              <div className="pt-3 flex flex-col">
                {/* Título */}
                <p className="text-base font-semibold text-white leading-tight mb-1.5 min-h-[2.6em] line-clamp-2">
                  {item.title}
                </p>
                {/* Tags (si los hubiera) */}
                <div className="flex gap-2 flex-wrap"></div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default RecentSeriesGrid;
