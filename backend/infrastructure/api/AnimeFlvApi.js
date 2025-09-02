import axios from "axios";
// Importas las entidades que definiste para mantener una estructura consistente
import {
  Anime,
  AnimeSearch,
  AnimeSearchClassData,
  searchingDataFilter,
} from "../../domain/entities/Anime.js";
import { Episode } from "../../domain/entities/Episode.js";
import { EpisodesDetail } from "../../domain/entities/EpisodesDetail.js";
import { EpisodeVideo } from "../../domain/entities/EpisodeVideo.js";

import { response } from "express";

// Centralizamos los headers para no repetirlos y poder cambiarlos fácilmente
const ANIMEFLV_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

/**
 * Esta clase se encarga EXCLUSIVAMENTE de comunicarse con la API de AnimeFLV.
 * Su única responsabilidad es hacer las peticiones y "traducir" los resultados
 * al formato de nuestras entidades de dominio (Anime, Episode).
 */
export class AnimeFlvApi {
  /**
   * Obtiene los últimos episodios emitidos.
   */
  async fetchLatestEpisodes() {
    const url = "https://animeflv.ahmedrangel.com/api/list/latest-episodes";
    try {
      const {
        data: { data: response },
      } = await axios.get(url, { headers: ANIMEFLV_HEADERS });

      if (!response) return [];

      // Mapea la respuesta de la API a nuestra entidad `Episode`
      return response.map(
        (item) =>
          new Episode(
            item.id, // El ID que venga de la API
            item.title,
            item.cover,
            item.number,
            item.slug
          )
      );
    } catch (error) {
      console.error(
        "Error fetching latest episodes from AnimeFLV:",
        error.message
      );
      // Lanza un error genérico para que el caso de uso lo pueda atrapar
      throw new Error("Could not fetch latest episodes.");
    }
  }

  /**
   * Obtiene los últimos animes que han salido o están en emisión.
   * Esta es la implementación completa que pediste.
   */
  async fetchLatestAiringAnimes() {
    try {
      // 1. Se obtiene la lista INICIAL que solo contiene slugs e IDs
      const listUrl = "https://animeflv.ahmedrangel.com/api/list/animes-on-air";
      const {
        data: { data: animesEnEmision },
      } = await axios.get(listUrl, { headers: ANIMEFLV_HEADERS });

      // Si la API no devuelve nada, retornamos un array vacío para evitar errores
      if (!animesEnEmision || animesEnEmision.length === 0) {
        return [];
      }

      // 2. Limitamos la cantidad de animes para no sobrecargar la API ni nuestra app
      const animesLimitados = animesEnEmision.slice(0, 12);

      // 3. Creamos un array de promesas. Cada promesa es una petición para obtener
      //    el detalle COMPLETO de un anime usando su slug.
      const peticionesDeDetalles = animesLimitados.map((anime) => {
        const detailUrl = `https://animeflv.ahmedrangel.com/api/anime/${anime.slug}`;
        return axios.get(detailUrl, { headers: ANIMEFLV_HEADERS });
      });

      // 4. Ejecutamos TODAS las peticiones en paralelo con Promise.all.
      //    Esto es mucho más eficiente que hacerlas una por una con un `await` dentro de un loop.
      const respuestasDeDetalles = await Promise.all(peticionesDeDetalles);

      // 5. Mapeamos los resultados de las respuestas detalladas para TRADUCIRLOS
      //    a nuestra entidad `Anime`.
      const resultadoFinal = respuestasDeDetalles.map((respuesta) => {
        const animeInfo = respuesta.data.data;
        // Creamos una nueva instancia de nuestra clase Anime.
        // Así nos aseguramos de que los datos siempre tendrán la misma estructura.
        // console.log(animeInfo.episodes[0].slug);

        return new Anime(
          // animeInfo.id,
          animeInfo.title,
          animeInfo.cover,
          animeInfo.poster, // La entidad Anime tiene poster, lo mapeamos si existe
          animeInfo.synopsis, // La entidad Anime tiene descripción, lo mapeamos si existe
          animeInfo.type,
          animeInfo.status,
          animeInfo.episodes[0]?.slug,
          animeInfo.episodes[0]?.slug
        );
      });

      return resultadoFinal;
    } catch (error) {
      console.error("Error processing airing animes request:", error.message);
      // Si CUALQUIERA de las peticiones falla, Promise.all se rechaza y este catch lo atrapará.
      throw new Error("Could not fetch the details of the latest animes.");
    }
  }

  async fetchAnimeEpisodeDetail(slug) {
    try {
      const urlanimeflv = `https://animeflv.ahmedrangel.com/api/anime/${slug}`;
      const {
        data: { data: responseData },
      } = await axios.get(urlanimeflv, {
        headers: ANIMEFLV_HEADERS,
      });

      const urlkitsu = `https://kitsu.io/api/edge/anime?filter[text]=${slug}`;
      const {
        data: { data: responseCover },
      } = await axios.get(urlkitsu);

      const imageXl = responseCover.map((item) => {
        // console.log(item.attributes?.coverImage?.original);

        const acc =
          item.attributes?.coverImage?.original ??
          item.attributes?.posterImage?.original;

        return acc;

        // console.log(item.attributes.coverImage )
      });

      // console.log(imageXl[0]);

      return new EpisodesDetail(
        responseData.title,
        responseData.title,
        imageXl[0],
        responseData.episodes,
        responseData.slug,
        responseData.rating,
        responseData.genres,
        responseData.cover,
        responseData.synopsis
      );
    } catch (error) {
      console.error("Error processing detail animes request:", error.message);
      // Si CUALQUIERA de las peticiones falla, Promise.all se rechaza y este catch lo atrapará.
      throw new Error("Could not fetch the details of the latest animes.");
    }
  }

  async fetchEpisodebySlug(slug, number_episode) {
    try {
      const urlEpisodeBySlug = `https://animeflv.ahmedrangel.com/api/anime/${slug}/episode/${number_episode}`;
      const {
        data: { data: response },
      } = await axios.get(urlEpisodeBySlug, { headers: ANIMEFLV_HEADERS });
      // console.log(response);

      return new EpisodeVideo(response);
      // return [];
    } catch (error) {
      console.error("Error processing episode request:", error.message);
      // Si CUALQUIERA de las peticiones falla, Promise.all se rechaza y este catch lo atrapará.
      throw new Error("Could not fetch the details of the latest animes.");
    }
  }

  async fetchSearchingByFilter(filters) {
    function normalizeFilter(filterValue) {
      // Si el valor ya es un arreglo, procesamos cada elemento.
      if (Array.isArray(filterValue)) {
        // Usamos map para crear un nuevo arreglo transformado.
        return filterValue.map((item) => {
          // Si el elemento es un string no vacío y es numérico...
          if (
            typeof item === "string" &&
            item.trim() !== "" &&
            !isNaN(Number(item))
          ) {
            // ...lo convertimos a entero.
            return parseInt(item, 10);
          }
          // Si no, lo dejamos como está (ya sea un número, un string no numérico, etc.).
          return item;
        });
      }

      // Si el valor es null, undefined o un string vacío, devuelve un arreglo vacío.
      if (
        filterValue === null ||
        filterValue === undefined ||
        filterValue === ""
      ) {
        return [];
      }

      // Si es un string no vacío y es numérico, lo convierte a número y lo envuelve en un arreglo.
      if (typeof filterValue === "string" && !isNaN(Number(filterValue))) {
        return [parseInt(filterValue, 10)];
      }

      // Para cualquier otro caso (un string no numérico, un booleano, etc.),
      // lo envuelve en un arreglo.
      return [filterValue];
    }

    // Suponiendo que 'filters' es el objeto que recibes.
    let types = normalizeFilter(filters["types[]"]);
    let genres = normalizeFilter(filters["genres[]"]);
    let statuses = normalizeFilter(filters["states[]"]);
    let sort = normalizeFilter(filters["sort"]);

    console.log(sort);

    // Nombre corregido: "fetch" en lugar de "feach"
    try {
      // 1. Espera a que la solicitud 'fetch' se complete
      const response = await fetch(
        `https://animeflv.ahmedrangel.com/api/search/by-filter?order=${sort}&page=${filters["page"]}`,
        {
          method: "POST",
          headers: {
            headers: ANIMEFLV_HEADERS,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            types: types,
            genres: genres,
            statuses: statuses,
          }),
        }
      );

      // Si la respuesta no es exitosa, lanza un error
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      // 2. Espera a que la respuesta se convierta a JSON
      const data = await response.json();
      // console.log(data.data.media);
      console.log(data);

      // 3. Retorna la data obtenida
      return new searchingDataFilter(data);
    } catch (error) {
      console.error("Error al buscar por filtro:", error);
      // Opcional: puedes relanzar el error o retornar un valor nulo/vacío
      return null;
    }
  }
  async fetchSearching(params) {
    try {
      const {
        data: { data: response },
      } = await axios.get(
        `https://animeflv.ahmedrangel.com/api/search?query=${params?.name}&page=${params?.page}`,
        { headers: ANIMEFLV_HEADERS }
      );
      return new AnimeSearch(response);
    } catch (error) {
      console.error("Error processing detail animes request:", error.message);
      // Si CUALQUIERA de las peticiones falla, Promise.all se rechaza y este catch lo atrapará.
      throw new Error("Could not fetch the details of the latest animes.");
    }
  }
}
