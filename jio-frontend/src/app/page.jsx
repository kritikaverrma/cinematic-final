import ListingSection from "../components/sections/ListingSection";
import { api, ENDPOINT } from "../lib/api";

export default function Home() {
  const list = [
    {
      label: "Top Rated",
      href: "top-rated",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.discoverTopRated);
        const data = res.data.results;
        return data;
        //ENDPOINT.discoverTopRated="/movie/top_rated"
      },
    },
    {
      label: "Popular",
      href: "popular",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.discoverTrending);
        const data = res.data.results;
        return data;
      },
    },
    {
      label: "Upcoming",
      href: "upcoming",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.discoverUpcoming);
        const data = res.data.results;
        return data;
      },
    },
  ];

  const getBannerData = async () => {
    //ENDPOINT.discoverNowPlaying="/discover/movie"
    const res = await api.get(ENDPOINT.discoverNowPlaying);
    const data = res.data.results;
    return data;
  };

  return (
    <main>
      <ListingSection bannerFetcher={getBannerData} list={list} />
    </main>
  );
}
