import { AnimeFlvApi } from "../../infrastructure/api/AnimeFlvApi.js";

export class GetLatestAiringAnimes {
  constructor() {
    this.animeFlvApi = new AnimeFlvApi();
  }

  async execute() {
    console.log("Executing GetLatestAiringAnimes use case...");
    const animes = await this.animeFlvApi.fetchLatestAiringAnimes();
    return animes;
  }
}
