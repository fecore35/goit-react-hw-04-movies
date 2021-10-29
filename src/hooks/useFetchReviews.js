import { useState, useEffect } from "react";
import { api } from "../services/api";
import { STATUS } from "./status";

function useFetchReviews(id) {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setStatus(STATUS.LOADING);
      const response = await api.fetchReviews(id);
      setReviews(response.results);
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
    reviews,
    status,
    error,
  };
}

export default useFetchReviews;
