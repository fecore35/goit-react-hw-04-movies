import { useState, useEffect } from "react";

import { api } from "../services/api";
import { STATUS } from "./status";

function useFetchMoviesById(id) {
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [poster, setPoster] = useState(null);
  const [genres, setGenres] = useState(null);
  const [overview, setOverview] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setStatus(STATUS.LOADING);
      const response = await api.fetchMoviesById(id);
      // console.log(response);
      setTitle(response.title);
      setDate(response.release_date);
      setPoster(`https://image.tmdb.org/t/p/w500${response.poster_path}`);
      setGenres(response.genres);
      setOverview(response.overview);
      setError(null);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setError(error);
      setStatus(STATUS.ERROR);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    title,
    date,
    poster,
    genres,
    overview,
    status,
    error,
    refetch,
  };
}

export default useFetchMoviesById;
