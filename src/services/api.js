import axios from "axios";

/* Global Config */
axios.defaults.baseURL = `https://api.themoviedb.org/3`;
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWQ2ZjY0MjNkYjU3NjNhODY3MzJiZDBhMzdjZGY0ZSIsInN1YiI6IjYxNzg2NjJlNmUwZDcyMDA5MDc0OTY1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mHeZkUxxh7ZlxrjflyB1OeCYs8CmUHuI8uOfS82GceU";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

export const api = Object.freeze({
  async fetchTrendingMoviesForDay() {
    const { data } = await axios.get(`/trending/movie/day`);
    return data.results;
  },

  async fetchMoviesByName(name, page = 1) {
    const response = await axios.get(
      `/search/movie?query=${name}&page=${page}`
    );
    return response.data;
  },

  async fetchMoviesById(id) {
    const response = await axios.get(`/movie/${id}`).catch(function (error) {
      if (error.response) {
        return {
          data: {
            status: error.response.status,
            message: error.response.data.status_message,
          },
        };
      }
    });
    return response.data;
  },

  async fetchCredits(id) {
    const response = await axios.get(`/movie/${id}/credits`);
    return response.data;
  },

  async fetchReviews(id) {
    const response = await axios.get(`/movie/${id}/reviews`);
    return response.data;
  },
});
