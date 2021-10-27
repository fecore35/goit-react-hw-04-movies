import { useState, useEffect } from "react";
import { api } from "services/api";

function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  const fetchCastAsync = async (id) => {
    try {
      const response = await api.fetchCredits(id);
      setCast(response.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCastAsync(movieId);
  }, [movieId]);

  return (
    <>
      <hr />
      {cast && (
        <ol>
          {cast.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ol>
      )}
    </>
  );
}

export default Cast;
