import { useEffect, useState } from "react";
import { api } from "../services/api";
import { STATUS } from "./status";

function useFetchCast(id) {
  const [cast, setCast] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setStatus(STATUS.LOADING);
      const response = await api.fetchCredits(id);
      setCast(response.cast);
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
    cast,
    status,
    error,
  };
}

export default useFetchCast;
