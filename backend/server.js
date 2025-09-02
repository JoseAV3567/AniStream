// backend/server.js
import express from "express";
import cors from "cors";

// Importas tus CASOS DE USO, no la lógica de la API
import { GetPopularAnime } from "./application/usecases/GetPopularAnime.js";
import { GetLatestEpisodes } from "./application/usecases/GetLatestEpisodes.js";
import { GetLatestAiringAnimes } from "./application/usecases/GetLatestAiringAnimes.js";
import { GetAnimeDetailEpisode } from "./application/usecases/GetAnimeDetailEpisode.js";
import { GetEpisodeVideo } from "./application/usecases/GetEpisodeVideo.js";
import { GetSearchin } from "./application/usecases/GetSearchin.js";

import { GetSearchingByFilter } from "./application/usecases/GetSearchingByFilter.js";

const app = express();
app.use(cors());
app.use(express.json()); // Reemplaza a bodyParser
// Coloca estas constantes en la parte superior de tu archivo de servidor,
// o en un archivo de configuración separado.

// El endpoint se vuelve limpio y declarativo
app.get("/api/v1/animes/popular", async (req, res) => {
  try {
    // 1. Instancia el caso de uso
    const getPopularAnimeUseCase = new GetPopularAnime();
    // 2. Lo ejecuta
    const animeList = await getPopularAnimeUseCase.execute();
    // 3. Devuelve el resultado
    res.json(animeList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para últimos episodios
app.get("/api/v1/episodes/latest", async (req, res) => {
  try {
    const getLatestEpisodesUseCase = new GetLatestEpisodes(); // Suponiendo que ya lo creaste
    const episodeList = await getLatestEpisodesUseCase.execute();
    res.json(episodeList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para últimos animes
app.get("/api/v1/animes/latest", async (req, res) => {
  try {
    const getLatestAiringAnimesUseCase = new GetLatestAiringAnimes(); // Suponiendo que ya lo creaste
    const animes = await getLatestAiringAnimesUseCase.execute();
    res.json(animes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/v1/episode/detail/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ error: "Slug parameter is missing." });
    }
    const GetAnimeDetailEpisodeUseCase = new GetAnimeDetailEpisode();
    const episodeDetails = await GetAnimeDetailEpisodeUseCase.execute(slug);
    res.json(episodeDetails);
  } catch (error) {
    console.error(
      "Error in /api/v1/episode/detail/:slug route:",
      error.message
    );
    res.status(500).json({ error: "Failed to fetch anime details." });
  }
});

app.get(`/api/v1/episode/video/:slug/:number_episode`, async (req, res) => {
  const { slug } = req.params;
  const { number_episode } = req.params;

  console.log(number_episode, slug);

  const GetEpisodeVideoUseCase = new GetEpisodeVideo();
  const EpisodeVideoResponse = await GetEpisodeVideoUseCase.execute(
    slug,
    number_episode
  );
  res.json(EpisodeVideoResponse);
});

// En tu archivo principal del servidor (ej: app.js o server.js)

// En tu archivo principal del servidor (ej: app.js o server.js)

app.get(`/api/v1/anime-by-filter`, async (req, res) => {
  try {
    let filters = req.query;
    console.log(filters);

    // console.log(genres);

    // --- LÓGICA PARA RECORRER Y USAR LOS FILTROS -
    const getSearchingByFilterUsecase = new GetSearchingByFilter();
    const responseData = await getSearchingByFilterUsecase.execute(filters);

    if (responseData) {
      res.json(responseData);
    } else {
      res.status(404).json({ message: "No se encontraron resultados." });
    }
  } catch (error) {
    console.error("Error en el endpoint /anime-by-filter:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

app.get("/api/v1/searching/:name", async (req, res) => {
  let { name } = req.params;
  const { page } = req.query;

  const GetSearchinUserCase = new GetSearchin();
  const searchingResponse = await GetSearchinUserCase.execute(name, page);
  res.json(searchingResponse);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
