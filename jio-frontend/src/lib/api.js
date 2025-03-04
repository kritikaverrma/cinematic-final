import axios from "axios";

export const ENDPOINT = {
  login: "/auth/login",
  signup: "/auth/signup",
  user: "/user",
  logout: "/auth/logout",
  forgetpassword: "/auth/forgetpassword",
  resetPassword: "/auth/resetPassword",
  payment: "/payment/order",
  updatePremium: "/payment/update-premium-access",

  addToWishlist: "/user/wishlist",
  getWishlist: "/user/wishlist",

  discoverNowPlaying: "/discover/movie",
  discoverTrending: "/movie/popular",
  discoverTopRated: "/movie/top_rated",
  discoverUpcoming: "/movie/upcoming",

  //action-28, comedy-35, horror-, romance-,
  //https://api.themoviedb.org/3/discover/movie?api_key=6d32249cd6759d1009f163e7b2a84742&
  //with_genres=28
  fetchActionMovies: `/discover/movie?api_key=6d32249cd6759d1009f163e7b2a84742&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=6d32249cd6759d1009f163e7b2a84742&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=6d32249cd6759d1009f163e7b2a84742&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=6d32249cd6759d1009f163e7b2a84742&with_genres=10749`,
  fetchAnimeMovies: `/discover/movie?api_key=6d32249cd6759d1009f163e7b2a84742&with_genres=16`,

  getMovieDetails: (id) => `/movie/${id}`,

  fetchActionTvShows: `/discover/tv?api_key=6d32249cd6759d1009f163e7b2a84742&sort_by=popularity.desc&with_genres=10759`,
  fetchComedyTvShows: `/discover/tv?api_key=6d32249cd6759d1009f163e7b2a84742&sort_by=popularity.desc&with_genres=35`,
  fetchCrimeTvShows: `/discover/tv?api_key=6d32249cd6759d1009f163e7b2a84742&sort_by=popularity.desc&with_genres=80`,
  fetchDramaTvShows: `/discover/tv?api_key=6d32249cd6759d1009f163e7b2a84742&sort_by=popularity.desc&with_genres=18`,
  fetchMysteryTvShows: `/discover/tv?api_key=6d32249cd6759d1009f163e7b2a84742&sort_by=popularity.desc&with_genres=9648`,

  getTvShowsDetails: (id) => `/tv/details?id=${id}`,

  fetchAllStreamingVideos: `/video`,
  fetchStreamingVideo: (id) => `/video?id=${id}`,
  fetchVideoThumbnail: (id) => `/video/thumbnail?videoId=${id}`,
};

export const API_BASE_URL = "https://api.themoviedb.org/3";

export const media = (path) => `https://image.tmdb.org/t/p/original` + path;

export const getStreamingVideoThumbnail = (id) =>
  API_BASE_URL + ENDPOINT.fetchVideoThumbnail(id);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDMyMjQ5Y2Q2NzU5ZDEwMDlmMTYzZTdiMmE4NDc0MiIsIm5iZiI6MTczNjE0ODYzMy41OTYsInN1YiI6IjY3N2I4Njk5ZWNhODViZDUwODcyOTBhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YZkbw6y1s3QaRsj5ga6OMqilsOac1ipSRjmjCa07V3c",
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

export const server_api = axios.create({
  baseURL: "https://4yffsl-4001.csb.app/api",
  withCredentials: true,
});
