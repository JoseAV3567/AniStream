import { apiSliceWithRefresh } from "./apiSlice";

export const AnimeApiSlice = apiSliceWithRefresh.injectEndpoints({
  endpoints: (builder) => ({
    //tutoring
    getLastedAnimeEpisodes: builder.query({
      query: (params) => ({
        url: "/episodes/latest",
        params,
      }),
    }),

    getAnimeOnAir: builder.query({
      query: (params) => ({
        url: "/animes/latest",
        params,
      }),
    }),
    getAnimePopularityRank: builder.query({
      query: (params) => ({
        url: "/animes/popular",
        params,
      }),
    }),
    getAnimeVideoBySlug: builder.query({
      query: ({ slug, number_episode }) => ({
        // CORREGIDO: Se usaron backticks (``) en lugar de barras (//)
        url: `/episode/video/${slug}/${number_episode}`,
      }),
    }),

    // ELIMINADO: Se borró el endpoint duplicado de getAnimeVideoBySlug

    getAnimeDetailBySlug: builder.query({
      query: (slug) => ({
        // CORREGIDO: Se usaron backticks (``) en lugar de barras (//)
        url: `/episode/detail/${slug}`,
      }),
    }),
    getAnimeSearchingByFilter: builder.query({
      query: (params) => ({
        url: "/anime-by-filter/",
        params,
      }),
    }),
    getAnimeSearching: builder.query({
      query: ({ slug, ...params }) => ({
        // CORREGIDO: Se usaron backticks (``) en lugar de barras (//)
        url: `/searching/${slug}`,
        params,
      }),
    }),
  }),
});

export const AnimeApi = AnimeApiSlice.endpoints;
