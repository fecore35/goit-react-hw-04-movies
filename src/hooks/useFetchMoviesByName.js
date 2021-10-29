import { useState, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useUrlQuery } from "../hooks/useUrlQuery";
import { api } from "../services/api";
import { STATUS } from "./status";

export function useFetchMoviesByName() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const query = useUrlQuery();
  const locationQuery = useMemo(() => query.get("query"), [query]);

  const history = useHistory();
  const location = useLocation();

  const refetch = async (name, page) => {
    try {
      setStatus(STATUS.LOADING);
      history.push({
        ...location,
        search: `query=${name}`,
      });
      const response = await api.fetchMoviesByName(name, page);
      setMovies(response.results);
      setError(null);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setError(error);
      setStatus(STATUS.ERROR);
    }
  };

  useEffect(() => {
    if (!locationQuery) {
      return;
    }

    refetch(locationQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    movies,
    status,
    error,
    refetch,
  };
}
