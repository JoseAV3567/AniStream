// backend/domain/entities/Episode.js
export class Episode {
  constructor(id, title, cover, episodeNumber, slug) {
    this.id = id;
    this.title = title;
    this.cover = cover;
    this.episodeNumber = episodeNumber;
    this.slug = slug;
  }
}
