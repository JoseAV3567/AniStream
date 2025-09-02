// backend/application/usecases/GetPopularAnime.js
import { KitsuApi } from "../../infrastructure/api/KitsuApi.js";

export class GetPopularAnime {
  constructor() {
    this.kitsuApi = new KitsuApi(); // El caso de uso DEPENDE de la infraestructura
  }

  // La lógica de negocio que tenías en el endpoint
  _getCurrentSeason() {
    const today = new Date();
    const currentMonth = today.getMonth();
    if (currentMonth >= 2 && currentMonth <= 4)
      return { season: "spring", year: today.getFullYear() };
    if (currentMonth >= 5 && currentMonth <= 7)
      return { season: "summer", year: today.getFullYear() };
    if (currentMonth >= 8 && currentMonth <= 10)
      return { season: "fall", year: today.getFullYear() };
    return { season: "winter", year: today.getFullYear() };
  }

  async execute() {
    // 1. Aplica la lógica de negocio
    const { season, year } = this._getCurrentSeason();
    // 2. Usa la infraestructura para obtener los datos
    const animeList = await this.kitsuApi.fetchPopularBySeason(year, season);
    // 3. Retorna los datos ya procesados y en el formato de tu dominio
    return animeList;
  }
}

