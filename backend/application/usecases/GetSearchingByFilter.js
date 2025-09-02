import { AnimeFlvApi } from "../../infrastructure/api/AnimeFlvApi.js";

// En tu archivo de casos de uso (ej: GetSearchingByFilter.js)

export class GetSearchingByFilter {
  constructor() {
    this.animeFlvApi = new AnimeFlvApi(); // Asegúrate de que AnimeFlvApi esté importada
  }

  /**
   * Ejecuta la búsqueda de animes por filtros.
   * @param {object} filters - Un objeto que puede contener title, genres, types, statuses, y page.
   */
  async execute(filters) {
    console.log(
      "Executing GetSearchingByFilter use case with filters:",
      filters
    );
    const animeData = await this.animeFlvApi.fetchSearchingByFilter(filters);
    return animeData;
  }
}
