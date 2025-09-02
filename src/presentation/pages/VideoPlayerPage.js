import React, { useState, useEffect, useRef, useMemo } from "react";
import { AnimeApi } from "../../services/AnimeApi.service";
import { useParams, Link, useNavigate } from "react-router-dom";

// --- Componente de Episodio reutilizable y dinámico ---
const EpisodeItem = React.forwardRef(
  ({ episode, isActive, isVisible }, ref) => {
    if (!isVisible) return null;

    const itemClasses = `flex items-center gap-4 p-3 px-4 text-slate-200 no-underline transition-colors duration-200 ${
      isActive ? "bg-emerald-500/30" : "hover:bg-slate-700/50"
    }`;

    return (
      <Link
        to={`/reporducir/${episode.slug.replace(/-?\d+$/, "")}/episodio/${
          episode?.number
        }`}
        className={itemClasses}
        ref={ref}
      >
        <div className="relative w-32 shrink-0">
          <img
            src={`https://placehold.co/128x72/1e293b/ffffff?text=E${episode.number}`}
            alt={`Episodio ${episode.number}`}
            className="block h-auto w-full rounded-md"
          />
          {isActive && (
            <div className="absolute left-1 top-1 rounded-md bg-emerald-500 px-2 py-0.5 text-[0.7em] font-bold text-white">
              ESTÁS VIENDO
            </div>
          )}
        </div>
        <div className="overflow-hidden">
          <p className="mb-0 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
            Episodio {episode.number}
          </p>
          <p className="mb-0 text-sm text-slate-400">Dob | Sub</p>
        </div>
      </Link>
    );
  }
);

// --- Componente Principal con la nueva funcionalidad ---
function VideoPlayerPage() {
  const navigate = useNavigate();
  const { slug, number_episode } = useParams();
  const slugFormatted = slug.replace(/-?\d+$/, "");
  const [currentEmbedUrl, setCurrentEmbedUrl] = useState("");
  const [activeServer, setActiveServer] = useState(null);

  const { data: video, isLoading: isLoadingVideo } =
    AnimeApi.getAnimeVideoBySlug.useQuery({
      slug: slugFormatted,
      number_episode: number_episode,
    });

  const { data: animeDetail, isLoading: isLoadingDetail } =
    AnimeApi.getAnimeDetailBySlug.useQuery(slugFormatted);

  const uniqueServers = useMemo(() => {
    if (!video?.title?.servers) return [];
    return video.title.servers.filter(
      (server, index, self) =>
        index === self.findIndex((s) => s.name === server.name)
    );
  }, [video]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [listMaxHeight, setListMaxHeight] = useState("0px");
  const titleSectionRef = useRef(null);
  const videoSectionRef = useRef(null);
  const episodeHeaderRef = useRef(null);
  const viewMoreSectionRef = useRef(null);
  const firstEpisodeRef = useRef(null);
  const activeEpisodeRef = useRef(null);

  useEffect(() => {
    if (video && video.title.servers && video.title.servers.length > 0) {
      const firstServer = uniqueServers[0];
      if (firstServer) {
        setCurrentEmbedUrl(firstServer.embed);
        setActiveServer(firstServer.name);
      }
    } else {
      setCurrentEmbedUrl("");
      setActiveServer(null);
    }
  }, [video]);

  useEffect(() => {
    if (!isLoadingDetail && activeEpisodeRef.current) {
      activeEpisodeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isLoadingDetail, number_episode]);

  useEffect(() => {
    const calculateHeights = () => {
      if (
        !titleSectionRef.current ||
        !videoSectionRef.current ||
        !firstEpisodeRef.current ||
        !episodeHeaderRef.current ||
        !viewMoreSectionRef.current
      ) {
        return;
      }

      const singleItemHeight = firstEpisodeRef.current.offsetHeight;
      const gap = 24;
      const mainContentHeight =
        titleSectionRef.current.offsetHeight +
        videoSectionRef.current.offsetHeight +
        gap;
      const nonScrollableHeight =
        episodeHeaderRef.current.offsetHeight +
        viewMoreSectionRef.current.offsetHeight;
      const expandedListHeight = mainContentHeight - nonScrollableHeight;

      if (isExpanded) {
        setListMaxHeight(`${expandedListHeight}px`);
      } else {
        if (number_episode != 1) {
          setListMaxHeight(`${singleItemHeight * 2}px`);
        } else {
          setListMaxHeight(`${singleItemHeight}px`);
        }
      }
    };
    setTimeout(calculateHeights, 100);
    window.addEventListener("resize", calculateHeights);
    return () => window.removeEventListener("resize", calculateHeights);
  }, [isExpanded, animeDetail, number_episode]);

  const handleToggleExpand = () => setIsExpanded((prev) => !prev);
  const handleServerClick = (server) => {
    setCurrentEmbedUrl(server.embed);
    setActiveServer(server.name);
  };

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-md"></div>
      </div>
      <div className="mx-auto max-w-7xl px-5 py-8">
        {/* <-- INICIO DEL CAMBIO: El botón ahora está aquí */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg bg-transparent px-4 py-2 text-sm font-semibold text-emerald-500 transition-colors hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
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
            Volver a la lista
          </button>
        </div>
        {/* <-- FIN DEL CAMBIO --> */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_1fr] lg:items-start">
          <main className="flex flex-col gap-6">
            {/* El botón ya no está aquí */}

            <section
              ref={titleSectionRef}
              className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-6 backdrop-blur-sm"
            >
              <h1 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-4xl font-black text-transparent">
                {isLoadingDetail
                  ? "Cargando..."
                  : `${
                      animeDetail?.title || "Título no disponible"
                    } - Episodio ${number_episode}`}
              </h1>
            </section>

            <section
              ref={videoSectionRef}
              className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm"
            >
              <div className="p-6">
                <p className="text-slate-400">Selecciona un servidor:</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {isLoadingVideo ? (
                    <p className="text-slate-400">Cargando servidores...</p>
                  ) : (
                    uniqueServers.map((server, i) => (
                      <button
                        key={`${server.name}-${i}`}
                        onClick={() => handleServerClick(server)}
                        className={`rounded-lg px-5 py-2.5 font-semibold text-white transition-colors duration-200 ${
                          activeServer === server.name
                            ? "bg-emerald-500"
                            : "bg-slate-700 hover:bg-emerald-500"
                        }`}
                      >
                        {server.name}
                      </button>
                    ))
                  )}
                </div>
              </div>
              <div className="aspect-video bg-black flex flex-col justify-between">
                {currentEmbedUrl ? (
                  <iframe
                    key={currentEmbedUrl}
                    src={currentEmbedUrl}
                    className="h-full w-full"
                    allowFullScreen
                    scrolling="no"
                    title="Video Player"
                    frameBorder="0"
                  ></iframe>
                ) : (
                  <div className="flex flex-grow items-center justify-center">
                    <p className="text-lg text-slate-400">
                      {isLoadingVideo
                        ? "Cargando video..."
                        : "Selecciona un servidor para reproducir."}
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white">Comentarios</h2>
              <hr className="my-4 h-px border-none bg-slate-700/50" />
              <p className="text-slate-400">
                La sección de comentarios se cargará aquí.
              </p>
            </section>
          </main>

          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm">
              <div
                ref={episodeHeaderRef}
                className="border-b border-slate-700/50 p-4"
              >
                <h3 className="text-lg font-bold text-white">Episodios</h3>
              </div>
              <div
                id="episode-list-container"
                className="transition-[max-height] duration-500 ease-in-out"
                style={{
                  maxHeight: listMaxHeight,
                  overflowY: isExpanded ? "auto" : "hidden",
                }}
              >
                {isLoadingDetail ? (
                  <p className="p-4 text-slate-400">Cargando episodios...</p>
                ) : (
                  animeDetail?.episodes?.map((ep, index) => {
                    const isActive = ep.number == number_episode;
                    return (
                      <div key={ep.number}>
                        <EpisodeItem
                          episode={ep}
                          isActive={isActive}
                          isVisible={
                            isExpanded ||
                            ep.number == 1 ||
                            ep.number == number_episode
                          }
                          ref={
                            index === 0
                              ? firstEpisodeRef
                              : isActive
                              ? activeEpisodeRef
                              : null
                          }
                        />
                      </div>
                    );
                  })
                )}
              </div>
              <div
                ref={viewMoreSectionRef}
                className="border-t border-slate-700/50 p-2"
              >
                <button
                  onClick={handleToggleExpand}
                  className="w-full bg-transparent text-emerald-500 transition-colors duration-200 hover:text-emerald-600 hover:underline"
                >
                  {isExpanded ? "Ver menos episodios" : "Ver más episodios"}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default VideoPlayerPage;
