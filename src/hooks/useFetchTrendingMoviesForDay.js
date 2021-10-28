import { useState, useEffect } from "react";
import { api } from "../services/api";
import { STATUS } from "./status";

export function useFetchTrendingMoviesForDay() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setStatus(STATUS.LOADING);
      const response = await api.fetchTrendingMoviesForDay();
      setMovies(response.results);
      setError(null);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setError(error);
      setStatus(STATUS.ERROR);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    movies,
    status,
    error,
    refetch,
  };
}
