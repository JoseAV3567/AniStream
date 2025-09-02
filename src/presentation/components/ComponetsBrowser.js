import { useState } from "react";
import { ChevronDown } from "lucide-react";

// --- Componente de Esqueleto para la Carga ---
export const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-slate-700"></div>
    <div className="h-4 bg-slate-700 rounded-md mt-2 w-3/4 mx-auto"></div>
  </div>
);

export const AnimeBrowserSkeleton = () => (
  <div className="bg-[#0f172a] text-white min-h-screen p-4 sm:p-8">
    <div className="max-w-screen-xl mx-auto">
      <div className="h-8 bg-slate-700 rounded-md w-1/3 mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 bg-[#1e293b] p-6 rounded-lg h-fit animate-pulse">
          <div className="h-6 w-1/4 bg-slate-700 rounded-md mb-4"></div>
          <div className="h-10 w-full bg-slate-700 rounded-md mb-6"></div>
          <div className="h-6 w-1/4 bg-slate-700 rounded-md mb-4"></div>
          <div className="h-10 w-full bg-slate-700 rounded-md mb-6"></div>
          <div className="h-6 w-1/4 bg-slate-700 rounded-md mb-4"></div>
          <div className="h-10 w-full bg-slate-700 rounded-md"></div>
        </div>
        <main className="lg:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  </div>
);

// --- Iconos ---
export const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

// --- Componente de Tarjeta de Anime ---
export const AnimeCard = ({ title, imageUrl }) => (
  <div className="group relative">
    <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-slate-700">
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <p className="mt-2 block truncate text-sm font-medium text-gray-200 text-center">
      {title}
    </p>
  </div>
);

export const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  const visiblePages = 2; 


  for (let i = 1; i <= lastPage; i++) {
    if (
      i === 1 ||
      i === lastPage ||
      (i >= currentPage - visiblePages && i <= currentPage + visiblePages)
    ) {
      if (
        pageNumbers.length > 0 &&
        i - pageNumbers[pageNumbers.length - 1] > 1
      ) {
        pageNumbers.push("...");
      }
      pageNumbers.push(i);
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center text-sm text-gray-300 mt-8 space-x-2"
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center rounded-md h-10 w-10 bg-[#1e293b] hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Previous</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {pageNumbers.map((number, index) =>
        typeof number === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(number)}
            className={`inline-flex items-center justify-center rounded-md h-10 w-10 transition-colors ${
              currentPage === number
                ? "bg-blue-600 font-bold text-white"
                : "bg-[#1e293b] hover:bg-slate-600"
            }`}
          >
            {number}
          </button>
        ) : (
          <span
            key={index}
            className="inline-flex items-center justify-center h-10 w-10"
          >
            {number}
          </span>
        )
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === lastPage}
        className="inline-flex items-center justify-center rounded-md h-10 w-10 bg-[#1e293b] hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </nav>
  );
};

const typeMap = {
  tv: "tv",
  ova: "ova",
  pelicula: "movie",
  especial: "special",
};
const sortOptions = [
  { value: "default", label: "Por defecto" },
  { value: "updated", label: "Actualizados" },
  { value: "added", label: "Agregados" },
  { value: "title", label: "Título" },
  { value: "rating", label: "Puntuación" },
];
const stateMap = { "en emision": 1, finalizado: 2, proximamente: 3 };
const normalizeString = (str) => {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const FilterButtonGroup = ({ title, options, selectedOptions, onToggle }) => (
  <div>
    <label className="block text-sm font-bold text-gray-300 mb-3">
      {title}
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onToggle(option)}
          className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1e293b] focus:ring-blue-500 ${
            selectedOptions.includes(option)
              ? "bg-blue-600 text-white shadow-md"
              : "bg-[#334155] text-gray-300 hover:bg-[#475569] hover:text-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export const FilterSidebar = ({
  onApplyFilters,
  onResetFilters,
  selectedTypes,
  onToggleType,
  selectedGenres,
  onToggleGenre,
  selectedStates,
  onToggleState,
  selectedSort,
  onSortChange,
}) => {
  const allTypes = ["TV", "OVA", "Película", "Especial"];
  const allGenres = [
    "Acción",
    "Artes Marciales",
    "Aventuras",
    "Carreras",
    "Ciencia Ficción",
    "Comedia",
    "Demencia",
    "Demonios",
    "Deportes",
    "Drama",
    "Ecchi",
    "Escolares",
    "Espacial",
    "Fantasía",
    "Harem",
    "Histórico",
    "Infantil",
    "Josei",
    "Juegos",
    "Magia",
    "Mecha",
    "Militar",
    "Misterio",
    "Música",
    "Parodia",
    "Policía",
    "Psicológico",
    "Recuentos de la vida",
    "Romance",
    "Samurai",
    "Seinen",
    "Shoujo",
    "Shounen",
    "Sobrenatural",
    "Superpoderes",
    "Suspenso",
    "Terror",
    "Vampiros",
    "Yaoi",
    "Yuri",
  ];
  const allStates = ["Finalizado", "En emisión", "Próximamente"];

  const [isGenresExpanded, setIsGenresExpanded] = useState(false);
  const visibleGenres = isGenresExpanded ? allGenres : allGenres.slice(0, 12);

  const handleSubmit = (event) => {
    event.preventDefault();
    const filters = {
      types: selectedTypes.map(
        (type) => typeMap[normalizeString(type)] || normalizeString(type)
      ),
      genres: selectedGenres.map((genre) =>
        normalizeString(genre).replace(/\s+/g, "-")
      ),
      states: selectedStates.map((state) => stateMap[normalizeString(state)]),
      sort: selectedSort,
    };
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  const handleReset = () => {
    setIsGenresExpanded(false);
    if (onResetFilters) {
      onResetFilters();
    }
  };

  return (
    <aside className="w-full bg-[#1e293b] p-4 lg:p-6 rounded-lg shadow-lg h-fit text-white">
      <form
        className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 lg:flex-col lg:items-stretch lg:gap-8"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="flex flex-wrap items-start gap-x-6 gap-y-4 flex-grow">
          <div className="flex-grow min-w-[150px]">
            <FilterButtonGroup
              title="TIPO"
              options={allTypes}
              selectedOptions={selectedTypes}
              onToggle={onToggleType}
            />
          </div>

          <div className="flex-grow min-w-[200px]">
            <FilterButtonGroup
              title="GÉNERO"
              options={visibleGenres}
              selectedOptions={selectedGenres}
              onToggle={onToggleGenre}
            />
            {allGenres.length > 12 && (
              <button
                type="button"
                onClick={() => setIsGenresExpanded(!isGenresExpanded)}
                className="w-full mt-3 text-center text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1"
              >
                {isGenresExpanded ? "Mostrar menos" : "Mostrar más"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isGenresExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          <div className="flex-grow min-w-[150px]">
            <FilterButtonGroup
              title="ESTADO"
              options={allStates}
              selectedOptions={selectedStates}
              onToggle={onToggleState}
            />
          </div>

          
          <div className="flex-grow min-w-[150px]">
            <label
              htmlFor="ordenar"
              className="block text-sm font-bold text-gray-300 mb-3"
            >
              ORDENAR
            </label>
            <select
              id="ordenar"
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full bg-[#334155] border border-transparent rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="updated">Última actualización</option>
              <option value="added">Fecha de agregado</option>
              <option value="rating">Puntuación</option>
              <option value="title">Título</option>
            </select>
          </div>
        </div>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row self-end gap-3 lg:pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-200 shadow-lg"
          >
            Buscar
          </button>
          <button
            type="reset"
            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-200"
          >
            Limpiar
          </button>
        </div>
      </form>
    </aside>
  );
};
