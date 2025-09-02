// backend/application/usecases/GetAnimeList.js
module.exports = class GetAnimeList {
  constructor(animeRepository) {
    this.animeRepository = animeRepository;
  }

  async execute() {
    return await this.animeRepository.findAll();
  }
};
