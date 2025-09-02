import React from "react";

export const HomeSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* 1. Skeleton para el CarouselComponent */}
      <div className="w-full h-[60vh] bg-gray-800 mb-8">
        <div className="flex flex-col justify-end h-full p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
          <div className="h-10 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>

      {/* 2. Skeleton para el VerticalCardScroller */}
      <div className="px-4 md:px-8 mb-8">
        <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="flex space-x-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0">
              <div className="w-40 h-56 bg-gray-700 rounded-md"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mt-2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Skeleton para el RecentSeriesGrid */}
      <div className="px-4 md:px-8">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[2/3] bg-gray-700 rounded-md"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6 mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DetailSkeleton = () => {
  return (
    <div className="bg-slate-900 font-sans">
      {/* --- Skeleton para la Sección Hero --- */}
      <section className="relative h-[80vh] min-h-[600px] flex items-end">
        <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-8">
          <div className="max-w-2xl space-y-4 animate-pulse">
            {/* Título */}
            <div className="h-14 bg-gray-700 rounded w-3/4"></div>
            {/* Rating y Tags */}
            <div className="flex items-center gap-4">
              <div className="h-6 bg-gray-700 rounded w-28"></div>
              <div className="h-6 bg-gray-700 rounded w-16"></div>
              <div className="h-6 bg-gray-700 rounded w-20"></div>
            </div>
            {/* Botones */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-12 bg-gray-700 rounded-md w-64"></div>
              <div className="w-12 h-12 bg-gray-700 rounded-md"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Skeleton para la Sección Principal de Contenido --- */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="animate-pulse">
          {/* Sinopsis */}
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </div>

          {/* Episodios */}
          <div className="mt-12">
            <div className="h-8 bg-gray-700 rounded w-1/5 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Generamos 8 tarjetas de episodio como placeholder */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="aspect-video bg-gray-700 rounded-md"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};



// --- Skeleton de la Tarjeta de Anime ---
const AnimeCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[2/3] w-full rounded-md bg-slate-700"></div>
    <div className="h-4 mt-2 bg-slate-700 rounded w-3/4 mx-auto"></div>
  </div>
);

// --- Componente principal del Skeleton ---
export const AnimeBrowserSkeleton = () => {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen p-4 sm:p-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Header estático, ya que no depende de datos */}
        <header className="mb-8 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold">Animes Recientes</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columna de Filtros (Sidebar) Skeleton */}
          <aside className="lg:col-span-1 bg-[#1e293b] p-6 rounded-lg h-fit animate-pulse">
            <div className="space-y-6">
              {/* Repetimos un bloque de filtro 5 veces */}
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <div className="h-4 bg-slate-600 rounded w-1/4 mb-2"></div>
                  <div className="h-10 bg-slate-700 rounded-md w-full"></div>
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <div className="h-10 bg-blue-800 rounded-md w-full"></div>
                <div className="h-10 bg-gray-700 rounded-md w-full"></div>
              </div>
            </div>
          </aside>

          {/* Contenido Principal (Grid de Animes) Skeleton */}
          <main className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {/* Generamos 15 tarjetas skeleton para llenar el espacio */}
              {Array.from({ length: 15 }).map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
