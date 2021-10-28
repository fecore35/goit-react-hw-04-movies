import { useState, useEffect } from "react";
import { api } from "../services/api";
import MovieList from "components/MovieList";

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

      {movie && <MovieList movies={movie} path={`movies`} />}
    </section>
  );
}

export default HomePage;
