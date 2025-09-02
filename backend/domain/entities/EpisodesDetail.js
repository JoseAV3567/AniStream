// backend/domain/entities/Episode.js
export class EpisodesDetail {
  constructor(id, title, cover, episodes, slug, rating, genres,imagePoster,synopsis) {
    this.id = id;
    this.title = title;
    this.cover = cover;
    this.episodes = episodes;
    this.slug = slug;
    this.genres = genres;
    this.rating = rating;
    this.imagePoster = imagePoster
    this.synopsis = synopsis
  }
}
