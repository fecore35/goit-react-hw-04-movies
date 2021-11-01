import { useFetchTrendingMoviesForDay } from "../hooks/useFetchTrendingMoviesForDay";
import MovieList from "components/MovieList";
import { STATUS } from "hooks/status";

function HomePage() {
  const { movies, status, error } = useFetchTrendingMoviesForDay();

  return (
    <section>
      <h2>Home</h2>

      {status === STATUS.ERROR && error}

      {status === STATUS.LOADING && "Loading..."}

      {status === STATUS.SUCCESS && (
        <MovieList movie={movies} path={`movies`} />
      )}
    </section>
  );
}

export default HomePage;
