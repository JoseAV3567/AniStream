// backend/server.js

// NOTA IMPORTANTE:
// Para que la sintaxis 'import' funcione en Node.js, asegúrate de que tu
// archivo `backend/package.json` tenga la siguiente línea:
// "type": "module",
//
// Ejemplo de backend/package.json:
// {
//   "name": "backend",
//   "version": "1.0.0",
//   "type": "module",  <-- AÑADIR ESTA LÍNEA
//   "main": "server.js",
//   "scripts": { ... },
//   "dependencies": { ... }
// }

import express from "express";
import cors from "cors";

// Importas tus CASOS DE USO
import { GetPopularAnime } from "./application/usecases/GetPopularAnime.js";
import { GetLatestEpisodes } from "./application/usecases/GetLatestEpisodes.js";
import { GetLatestAiringAnimes } from "./application/usecases/GetLatestAiringAnimes.js";
import { GetAnimeDetailEpisode } from "./application/usecases/GetAnimeDetailEpisode.js";
import { GetEpisodeVideo } from "./application/usecases/GetEpisodeVideo.js";
import { GetSearchin } from "./application/usecases/GetSearchin.js";
import { GetSearchingByFilter } from "./application/usecases/GetSearchingByFilter.js";

const app = express();
app.use(cors());
app.use(express.json());

// --- Rutas de la API ---

// Endpoint para animes populares
app.get("/api/v1/animes/popular", async (req, res) => {
  try {
    const getPopularAnimeUseCase = new GetPopularAnime();
    const animeList = await getPopularAnimeUseCase.execute();
    res.json(animeList);
  } catch (error) {
    console.error("Error en /animes/popular:", error.message);
    res.status(500).json({ message: "Error al obtener animes populares." });
  }
});

// Endpoint para últimos episodios
app.get("/api/v1/episodes/latest", async (req, res) => {
  try {
    const getLatestEpisodesUseCase = new GetLatestEpisodes();
    const episodeList = await getLatestEpisodesUseCase.execute();
    res.json(episodeList);
  } catch (error) {
    console.error("Error en /episodes/latest:", error.message);
    res.status(500).json({ message: "Error al obtener últimos episodios." });
  }
});

// Endpoint para últimos animes en emisión
app.get("/api/v1/animes/latest", async (req, res) => {
  try {
    const getLatestAiringAnimesUseCase = new GetLatestAiringAnimes();
    const animes = await getLatestAiringAnimesUseCase.execute();
    res.json(animes);
  } catch (error) {
    console.error("Error en /animes/latest:", error.message);
    res.status(500).json({ message: "Error al obtener últimos animes." });
  }
});

// Endpoint para el detalle de un episodio
app.get("/api/v1/episode/detail/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res
        .status(400)
        .json({ message: "El parámetro slug es requerido." });
    }
    const getAnimeDetailEpisodeUseCase = new GetAnimeDetailEpisode();
    const episodeDetails = await getAnimeDetailEpisodeUseCase.execute(slug);
    res.json(episodeDetails);
  } catch (error) {
    console.error("Error en /episode/detail/:slug:", error.message);
    res
      .status(500)
      .json({ message: "Error al obtener los detalles del anime." });
  }
});

// Endpoint para el video de un episodio
app.get(`/api/v1/episode/video/:slug/:number_episode`, async (req, res) => {
  try {
    // <-- CORRECCIÓN: Añadido try...catch
    const { slug, number_episode } = req.params;

    const getEpisodeVideoUseCase = new GetEpisodeVideo();
    const episodeVideoResponse = await getEpisodeVideoUseCase.execute(
      slug,
      number_episode
    );
    res.json(episodeVideoResponse);
  } catch (error) {
    console.error(
      "Error en /episode/video/:slug/:number_episode:",
      error.message
    );
    res
      .status(500)
      .json({ message: "Error al obtener el video del episodio." });
  }
});

// Endpoint para buscar animes por filtros
app.get(`/api/v1/anime-by-filter`, async (req, res) => {
  try {
    const filters = req.query;

    const getSearchingByFilterUsecase = new GetSearchingByFilter();
    const responseData = await getSearchingByFilterUsecase.execute(filters);

    if (responseData && responseData.length > 0) {
      res.json(responseData);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron resultados con esos filtros." });
    }
  } catch (error) {
    console.error("Error en /anime-by-filter:", error.message);
    res.status(500).json({ message: "Error interno del servidor al filtrar." });
  }
});

// Endpoint para buscar por nombre
// CORRECCIÓN: Se cambió la ruta de /searching/:name a /search y se usa req.query
app.get("/api/v1/search", async (req, res) => {
  try {
    // <-- CORRECCIÓN: Añadido try...catch
    const { name } = req.query; // <-- CORRECCIÓN: Se extrae 'name' de req.query
    if (!name) {
      return res
        .status(400)
        .json({ message: "El parámetro 'name' es requerido." });
    }

    const getSearchinUserCase = new GetSearchin();
    const searchingResponse = await getSearchinUserCase.execute(name); // <-- CORRECCIÓN: Se pasa solo el valor
    res.json(searchingResponse);
  } catch (error) {
    console.error("Error en /search:", error.message);
    res.status(500).json({ message: "Error al realizar la búsqueda." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  const publicUrl = process.env.PUBLIC_URL;
  console.log(`El servidor está corriendo. Accede en: ${publicUrl}`);
});
