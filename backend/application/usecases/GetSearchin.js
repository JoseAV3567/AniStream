import { AnimeFlvApi } from "../../infrastructure/api/AnimeFlvApi.js";

export class GetSearchin {
  constructor() {
    this.animeFlvApi = new AnimeFlvApi();
  }

  async execute(name_anime, page) {
    console.log("Executing GetSearchin use case...");
    const anime = await this.animeFlvApi.fetchSearching(name_anime, page);
    return anime;
  }
}
