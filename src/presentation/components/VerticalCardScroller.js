// src/Components/EpisodeList.js
import React from "react";
import { Link } from "react-router-dom";

// Cambié el nombre de la función para que coincida con el nombre del archivo
function EpisodeList({ title, items }) {
  if (!items || items.length === 0) {
    return null;
  }
  console.log(items);

  return (
    // episodes-section
    <section className="w-full bg-slate-90 font-sans px-4 py-8">
      {/* section-title */}
      <h2 className="text-3xl font-semibold text-white mb-6">{title}</h2>

      {/* episodes-list */}
      <ul className="list-none p-0 m-0 grid gap-y-8 gap-x-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {items.map((item) => (
          // episode-card-horizontal
          <li
            key={item.title}
            className="cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1"
          >
            {/* card-link */}
            <Link
              to={`/reporducir/${item.slug}/episodio/${item.episodeNumber}`}
              className="block no-underline text-inherit"
            >
              {/* card-image */}
              <div className="relative w-full aspect-video overflow-hidden rounded-md shadow-[0_4px_15px_rgba(0,0,0,0.3)] mb-3">
                {/* card-badge */}
                <div className="absolute top-2 left-2 z-10 bg-[#28a745] text-white py-1 px-2.5 rounded-md text-[0.6rem] font-bold uppercase shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wider">
                  Episodio {item?.episodeNumber}
                </div>
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* card-info */}
              <div className="card-info">
                {/* title */}
                <p className="text-sm font-medium text-white leading-snug min-h-[2.5em] line-clamp-2">
                  {item.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EpisodeList;
