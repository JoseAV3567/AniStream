// backend/infrastructure/api/KitsuApi.js
import axios from "axios";
import { Anime } from "../../domain/entities/Anime.js"; // Importas tu entidad

export class KitsuApi {
  // La lógica que tenías en la ruta /v1/animes-mas-vistos
  async fetchPopularBySeason(year, season) {
    const url = `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&filter[season]=${season}&sort=popularityRank&page[limit]=10`;
    try {
      const {
        data: { data: response },
      } = await axios.get(url);

      response.map((item) => {
        console.log(item.attributes.coverImage?.large);
      });

      // Aquí ocurre la "traducción". Mapeas la respuesta de Kitsu a tu entidad Anime.
      const animeList = response.map((item) => {
        const image_cover =
          item.attributes?.coverImage?.original ??
          item.attributes?.posterImage?.large;
        return new Anime(
          // item.id,
          item.attributes.canonicalTitle,
          image_cover,
          item.attributes.posterImage?.large,
          item.attributes.description,
          item.attributes.subtype,
          item.attributes.status
        );
      });
      return animeList;
    } catch (error) {
      console.error("Error fetching from Kitsu API:", error);
      throw new Error("Could not fetch data from Kitsu.");
    }
  }
}
