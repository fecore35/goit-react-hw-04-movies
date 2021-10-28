import { useFetchTrendingMoviesForDay } from "../hooks/useFetchTrendingMoviesForDay";
import MovieList from "components/MovieList";

function HomePage() {
  const fetchTrendingMovies = useFetchTrendingMoviesForDay();

  return (
    <section>
      <h2>Home</h2>

      <MovieList movie={fetchTrendingMovies.movies} path={`movies`} />
    </section>
  );
}

export default HomePage;
