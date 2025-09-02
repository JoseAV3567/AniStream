// backend/domain/entities/Anime.js
export class Anime {
  constructor(title, cover, poster, synopsis, type, status, episodes, slug) {
    // this.id = title;
    this.title = title;
    this.cover = cover;
    this.poster = poster;
    this.synopsis = synopsis;
    this.type = type;
    this.status = status;
    this.episodes = episodes;
    this.slug = slug;
  }
}

export class MediaItem {
  constructor({ title, cover, synopsis, rating, slug, type, url }) {
    this.title = title;
    this.cover = cover;
    this.synopsis = synopsis;
    this.rating = rating;
    this.slug = slug;
    this.type = type;
    this.url = url;
  }
}

export class AnimeSearch {
  constructor({
    currentPage,
    hasNextPage,
    previousPage,
    nextPage,
    foundPages,
    media,
  }) {
    this.currentPage = currentPage;
    this.hasNextPage = hasNextPage;
    this.previousPage = previousPage;
    this.nextPage = nextPage;
    this.foundPages = foundPages;
    this.media = media.map((item) => new MediaItem(item));
  }
}

export class AnimeSearchClassData {
  constructor({ title }) {
    this.title = new AnimeSearch(title);
  }
}

class Data {
  constructor({
    currentPage,
    hasNextPage,
    previousPage,
    nextPage,
    foundPages,
    media,
  }) {
    this.currentPage = currentPage;
    this.hasNextPage = hasNextPage;
    this.previousPage = previousPage;
    this.nextPage = nextPage;
    this.foundPages = foundPages;
    this.media = media.map((item) => new MediaItem(item));
  }
}

export class searchingDataFilter {
  constructor({ success, data }) {
    this.success = success;
    this.data = new Data(data);
  }
}
