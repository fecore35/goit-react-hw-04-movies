import { useState, useEffect } from "react";

import { api } from "../services/api";
import { STATUS } from "./status";

function useFetchMoviesById(id) {
  const [title, setTitle] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setStatus(STATUS.LOADING);
      const response = await api.fetchMoviesById(id);
      setTitle(response.title);
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
    status,
    error,
    refetch,
  };
}

export default useFetchMoviesById;
