import ListingSection from "../../components/sections/ListingSection";
import { api, ENDPOINT } from "../../lib/api";
import React from "react";

const MoviesPage = (props) => {
  const list = [
    {
      label: "Top Comedy Movies",
      href: "comedy",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.fetchComedyMovies);
        const data = res.data.results;
        return data;
      },
    },
    {
      label: "Top Horror Movies",
      href: "horror",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.fetchHorrorMovies);
        const data = res.data.results;
        return data;
      },
    },
    {
      label: "Top Romance Movies",
      href: "romance",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.fetchRomanceMovies);
        const data = res.data.results;
        return data;
      },
    },
    {
      label: "Top Action Movies",
      href: "action",
      fetcher: async () => {
        const res = await api.get(ENDPOINT.fetchActionMovies);
        const data = res.data.results;
        return data;
      },
    },
  ];
  const getBannerData = async () => {
    const res = await api.get(ENDPOINT.fetchAnimeMovies);
    const data = res.data.results;
    return data;
  };

  return (
    <main>
      <ListingSection bannerFetcher={getBannerData} list={list} />
    </main>
  );
};

export default MoviesPage;
