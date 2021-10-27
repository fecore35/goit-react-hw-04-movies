import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

function HomePage() {
  const [movie, setMovie] = useState(null);

  const fetchMoviesAsync = async () => {
    try {
      const response = await api.fetchTrendingMoviesForDay();
      setMovie(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMoviesAsync();
  }, []);

  return (
    <section>
      <h2>Home</h2>

      {movie && (
        <ol>
          {movie.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`movies/${item.id}`}>{item.title}</Link>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

export default HomePage;
