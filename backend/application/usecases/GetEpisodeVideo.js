import { AnimeFlvApi } from "../../infrastructure/api/AnimeFlvApi.js";

export class GetEpisodeVideo {
  constructor() {
    this.animeFlvApi = new AnimeFlvApi();
  }

  //   /**
  //    * The execute method now accepts the 'slug' parameter.
  //    * @param {string,number_episode} slug,  - The identifier for the anime.
  //    */
  async execute(slug, number_episode) {
    console.log(
      `Executing GetEpisodeVideo use case for slug: ${slug} ${number_episode}`
    );
    // The slug is passed down to the API service method.
    const episodes = await this.animeFlvApi.fetchEpisodebySlug(slug,number_episode);
    return episodes;
  }
}
