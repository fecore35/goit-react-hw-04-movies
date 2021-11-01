import { useQuery } from "react-query";
import { api } from "../../services/api";

export function useFetchTrendingMoviesForDay() {
  const query = useQuery(["topMovies"], api.fetchTrendingMoviesForDay, {
    cacheTime: 1200000,
    staleTime: 10000,
  });

  return query;
}
