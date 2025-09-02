import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimeApi } from "../../services/AnimeApi.service";
import {
  Pagination,
  AnimeCard,
  HomeIcon,
  FilterSidebar,
} from "../components/ComponetsBrowser";

const AnimeCardSkeleton = () => (
  <div className="w-full bg-slate-800 aspect-[2/3] rounded-md animate-pulse"></div>
);

const AnimeBrowser = () => {
  const { slug } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [apiFilters, setApiFilters] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedSort, setSelectedSort] = useState("default"); // ordenación

  // --- helpers
  const handleToggle = (option, selected, setSelected) => {
    setSelected((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleApplyFilters = (filtersFromSidebar) => {
    setApiFilters(filtersFromSidebar);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedGenres([]);
    setSelectedStates([]);
    setSelectedSort("default");
    setApiFilters({});
    setCurrentPage(1);
  };

  // --- filtros activos que se mandan al backend
  const activeFiltersForAPI = {
    ...apiFilters,
    page: currentPage,
  };

  // --- Condición principal
  const hasActiveFilters =
    (activeFiltersForAPI.genres && activeFiltersForAPI.genres.length > 0) ||
    (activeFiltersForAPI.types && activeFiltersForAPI.types.length > 0) ||
    (activeFiltersForAPI.states && activeFiltersForAPI.states.length > 0) ||
    activeFiltersForAPI.sort !== undefined;

  let api;

  if (hasActiveFilters) {
    api = AnimeApi.getAnimeSearchingByFilter.useQuery(activeFiltersForAPI);
  } else if (slug) {
    api = AnimeApi.getAnimeSearching.useQuery({
      page: currentPage,
      name: slug,
    });
  } else {
    api = AnimeApi.getAnimeSearchingByFilter.useQuery({ page: currentPage });
  }

  const { data: response, isFetching, isError } = api;
  let pageInfo = response?.data;

  if (!hasActiveFilters && slug) {
    pageInfo = response;
  }

  return (
    <div className="bg-[#0f172a] text-white min-h-screen p-4 sm:p-8">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <HomeIcon />
          <h1 className="text-2xl sm:text-3xl font-bold">
            Directorio de Animes
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterSidebar
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            selectedTypes={selectedTypes}
            onToggleType={(type) =>
              handleToggle(type, selectedTypes, setSelectedTypes)
            }
            selectedGenres={selectedGenres}
            onToggleGenre={(genre) =>
              handleToggle(genre, selectedGenres, setSelectedGenres)
            }
            selectedStates={selectedStates}
            onToggleState={(state) =>
              handleToggle(state, selectedStates, setSelectedStates)
            }
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />

          <main className="lg:col-span-3">
            {isFetching ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {[...Array(15)].map((_, i) => (
                  <AnimeCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ||
              !response ||
              !pageInfo ||
              pageInfo.media.length === 0 ? (
              <div className="flex items-center justify-center h-64 bg-slate-900/50 rounded-lg">
                <p className="text-gray-400">
                  {isError
                    ? "Ocurrió un error al cargar los datos."
                    : "No se encontraron animes con estos filtros."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                  {pageInfo.media.map((anime) => (
                    <Link
                      key={anime.id}
                      to={`/videos/detalle/${anime.slug}`}
                      className="block hover:scale-105 transition-transform duration-200"
                    >
                      <AnimeCard title={anime.title} imageUrl={anime.cover} />
                    </Link>
                  ))}
                </div>

                {pageInfo && pageInfo.foundPages > 1 && (
                  <Pagination
                    currentPage={pageInfo.currentPage}
                    lastPage={pageInfo.foundPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AnimeBrowser;
