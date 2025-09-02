import { AnimeFlvApi } from "../../infrastructure/api/AnimeFlvApi.js";

export class GetAnimeDetailEpisode {
  constructor() {
    this.animeFlvApi = new AnimeFlvApi();
  }

  /**
   * The execute method now accepts the 'slug' parameter.
   * @param {string} slug - The identifier for the anime.
   */
  async execute(slug) {
    console.log(`Executing GetAnimeDetailEpisode use case for slug: ${slug}`);
    // The slug is passed down to the API service method.
    const episodes = await this.animeFlvApi.fetchAnimeEpisodeDetail(slug);
    return episodes;
  }
}
