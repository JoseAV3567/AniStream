import { AnimeFlvApi } from "../../infrastructure/api/AnimeFlvApi.js";

export class GetLatestEpisodes {
  constructor() {
    // Cuando se crea una instancia de este caso de uso,
    // internamente crea una instancia del servicio que necesita para trabajar.
    this.animeFlvApi = new AnimeFlvApi();
  }

  async execute() {
    console.log("Executing GetLatestEpisodes use case...");
    const episodes = await this.animeFlvApi.fetchLatestEpisodes();
    return episodes;
  }
}
