import { useQuery, useQueryClient } from "react-query";
import { api } from "../../services/api";
import loadingPoster from "../../images/poster-loading.png";

export function useFetchMoviesById(movieId) {
  const client = useQueryClient();

  const query = useQuery(
    ["movie", movieId],
    async () => {
      const movieById = await api.fetchMoviesById(movieId);
      return movieById;
    },
    {
      placeholderData() {
        const moviePreview = client
          .getQueryData("topMovies")
          ?.find((movie) => movie.id === Number(movieId));

        return (
          moviePreview ?? {
            title: "placeholderData: Loading...",
            release_date: "0000-00-00",
            poster_path: loadingPoster,
          }
        );
      },
      onError() {},
      cacheTime: 0,
      staleTime: 10000,
      retry: 2,
      retryDelay: 2000,
    }
  );

  return query;
}
