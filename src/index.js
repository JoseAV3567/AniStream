// src/index.js
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/services/store";

import ResponsiveAppBar from "./presentation/components/ResponsiveAppBar";
import Layout from "./presentation/components/Layout";
import Home from "./presentation/pages/Home";
import VideoPlayerPage from "./presentation/pages/VideoPlayerPage";
import SeriesDetailPage from "./presentation/pages/SeriesDetailPage";
import AnimeBrowser from "./presentation/pages/AnimeBrowser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/videos/detalle/:slug",
        element: <SeriesDetailPage />,
      },
      {
        path: "/reporducir/:slug/episodio/:number_episode",
        element: <VideoPlayerPage />,
      },
      {
        path: "/anime/buscar/:slug",
        element: <AnimeBrowser />,
      },
      {
        path: "/anime/directorio",
        element: <AnimeBrowser />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ResponsiveAppBar />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
