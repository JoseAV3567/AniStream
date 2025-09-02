import React, { useState } from "react";

// --- Iconos SVG ---
export const StarIcon = ({ filled = false }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-emerald-400" : "text-gray-600"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const PlayIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const PlusIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// --- Componentes de UI Reutilizables ---

export const StarRating = ({ rating = 0 }) => {
  // Set a default value for rating
  const totalStars = 5;

  // Clamp the rating to ensure it's between 0 and 5
  const clampedRating = Math.max(0, Math.min(rating, totalStars));

  // Use the clamped value for calculations
  const fullStars = Math.floor(clampedRating);
  const emptyStars = totalStars - fullStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} filled />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} />
      ))}
      {/* It's often better to display the original rating */}
      <span className="ml-2 font-semibold text-white">{rating}</span>
    </div>
  );
};

export const EpisodeCard = ({
  episode,
  season,
  isPlaying,
  onPlay,
  cover,
  episodeNumber,
}) => (
  <div
    className={`group bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 ${
      isPlaying ? "ring-2 ring-emerald-500" : ""
    }`}
  >
    <div className="relative aspect-video">
      <img
        src={cover}
        alt={episode?.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
        <button
          onClick={() => onPlay(episode?.id)}
          aria-label={`Reproducir T${season} E${episode?.title}`}
          className="w-14 h-14 rounded-full bg-emerald-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm cursor-pointer border-none"
        >
          <PlayIcon />
        </button>
      </div>
      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded-sm">
        24:00
      </span>
    </div>
    <div className="p-4">
      <h4 className="text-white font-bold truncate">
        {episode?.title} - Episodio {episodeNumber}
      </h4>
      {/* <p className="text-gray-400 text-sm mt-1 h-10 overflow-hidden">
        {episode.description}
      </p> */}
    </div>
  </div>
);

export const Synopsis = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = text?.length > 200;
  const displayText = isExpanded
    ? text
    : `${text?.substring(0, 200)}${isLongText ? "..." : ""}`;

  return (
    <div>
      <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
        {displayText}
      </p>
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-emerald-400 hover:text-emerald-300 font-semibold mt-2"
        >
          {isExpanded ? "Leer menos" : "Leer más"}
        </button>
      )}
    </div>
  );
};

