import ListingSection from "../../components/sections/ListingSection";
import { api, ENDPOINT } from "../../lib/api";
import React from "react";

const SportsPage = (props) => {
  const list = [
    {
      label: "Comedy",
      href: "comedy",
      fetcher: async () => {
        //
        const res = await api.get(ENDPOINT.fetchComedyTvShows);
        const data = res.data.results;
        console.log(data);
        return data;
      },
    },
    {
      label: "Crime",
      href: "crime",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.fetchCrimeTvShows);
        const data = res.data.results;
        return data;
      },
    },
    {
      label: "Drama",
      href: "drama",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.fetchDramaTvShows);
        const data = res.data.results;
        return data;
      },
    },
    {
      label: "Action",
      href: "action",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.fetchActionTvShows);
        const data = res.data.results;
        return data;
      },
    },
  ];
  const getBannerData = async () => {
    const res = await api.get(ENDPOINT.fetchMysteryTvShows);
    const data = res.data.results;
    return data;
  };

  return (
    <main>
      <ListingSection bannerFetcher={getBannerData} list={list} />
    </main>
  );
};

export default SportsPage;
