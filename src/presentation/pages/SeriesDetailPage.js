import { Link, useLocation, useParams } from "react-router-dom";
import React, { useState, useMemo } from "react";
import { AnimeApi } from "../../services/AnimeApi.service";
import {
  CheckIcon,
  EpisodeCard,
  PlayIcon,
  PlusIcon,
  StarIcon,
  StarRating,
  Synopsis,
} from "../components/DetailSerieComponet";

import { DetailSkeleton } from "../components/Skeleton";

export default function App() {
  const { slug } = useParams();
  const slugFormatted = slug.replace(/-?\d+$/, "");

  const {
    data: animeDetail,
    isLoading,
    isError,
  } = AnimeApi.getAnimeDetailBySlug.useQuery(slugFormatted);
  console.log(animeDetail);

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [playingEpisode, setPlayingEpisode] = useState(null);
  const [isInList, setIsInList] = useState(false);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError || !animeDetail) {
    return (
      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">
        Ocurrió un error al cargar la información del anime.
      </div>
    );
  }

  return (
    <div className="bg-slate-900 font-sans">
      {/* --- Sección Hero --- */}
      <section className="relative h-[80vh] min-h-[600px] flex items-end text-white">
        <div className="absolute inset-0">
          <img
            src={animeDetail?.cover}
            alt="Hero Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/1920x1080/1a202c/ffffff?text=${encodeURIComponent(
                animeDetail?.title
              )}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight sm:leading-none tracking-tighter">
              {animeDetail?.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <StarRating rating={animeDetail?.rating} />
              <div className="flex flex-wrap gap-2">
                {animeDetail?.genres.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold bg-white/10 py-1 px-2 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <button className="py-3 px-8 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg rounded-md flex items-center gap-2 transition-colors duration-200 ease-in-out">
                <PlayIcon />
                <span>COMENZAR A VER T{selectedSeason} E1</span>
              </button>
              <button
                aria-label={
                  isInList ? "Quitar de mi lista" : "Añadir a mi lista"
                }
                onClick={() => setIsInList(!isInList)}
                className={`w-12 h-12 border-2  rounded-md flex items-center justify-center transition-all duration-200 ease-in-out ${
                  isInList
                    ? "bg-emerald-500 border-emerald-500 text-black"
                    : "border-white/50 hover:border-white hover:bg-white/10 bg-transparent text-white"
                }`}
              >
                {isInList ? <CheckIcon /> : <PlusIcon />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Sección Principal de Contenido --- */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Sinopsis</h2>
              <Synopsis text={animeDetail?.synopsis} />
            </section>
            <section className="mt-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-white">Episodios</h2>
                <div className="flex items-center bg-gray-900 rounded-md p-1 flex-wrap">
                  {/* Lógica para seleccionar temporada (si la implementas) */}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {animeDetail?.episodes.map((episode) => (
                  <Link
                    to={`/reporducir/${episode?.slug}/episodio/${episode?.number}`}
                    className="block no-underline text-inherit"
                  >
                    <EpisodeCard
                      key={`${selectedSeason}-${episode?.slug}`}
                      cover={animeDetail?.imagePoster}
                      episode={animeDetail}
                      episodeNumber={episode?.number}
                      season={selectedSeason}
                      isPlaying={playingEpisode === episode?.id}
                      onPlay={(episodeId) => setPlayingEpisode(episodeId)}
                    />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
