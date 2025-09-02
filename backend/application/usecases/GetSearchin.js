import { AnimeFlvApi } from "../../infrastructure/api/AnimeFlvApi.js";

export class GetSearchin {
  constructor() {
    this.animeFlvApi = new AnimeFlvApi();
  }

  async execute(name_anime) {
    console.log("Executing GetSearchin use case...");
    const anime = await this.animeFlvApi.fetchSearching(name_anime);
    return anime;
  }
}
