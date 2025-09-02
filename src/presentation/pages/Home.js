import React from "react";
import CarouselComponent from "../components/CarouselComponet/CarouselComponet";
import VerticalCardScroller from "../components/VerticalCardScroller";
import RecentSeriesGrid from "../components/RecentSeriesGrid";
import { AnimeApi } from "../../services/AnimeApi.service";

import { HomeSkeleton } from "../components/Skeleton";

function Home() {
  const { data: popularityRank, isLoading: isLoadingPopularity } =
    AnimeApi.getAnimePopularityRank.useQuery();

  const { data: lastedAnimeEpisodes, isLoading: isLoadingLasted } =
    AnimeApi.getLastedAnimeEpisodes.useQuery();

  const { data: animesOnAir, isLoading: isLoadingOnAir } =
    AnimeApi.getAnimeOnAir.useQuery();

  if (isLoadingPopularity || isLoadingLasted || isLoadingOnAir) {
    return <HomeSkeleton />;
  }

  return (
    <div>
      <CarouselComponent slideItems={popularityRank} />
      <VerticalCardScroller
        title="Últimos Episodios"
        items={lastedAnimeEpisodes}
      />
      <RecentSeriesGrid
        mainTitle={"Series Recientes"}
        subtitle={
          "Series agregadas recientemente. Para navegar por otras series ve a"
        }
        items={animesOnAir}
      />
    </div>
  );
}

export default Home;
