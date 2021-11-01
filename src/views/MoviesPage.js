import { useRouteMatch } from "react-router-dom";
import { useFetchMoviesByName } from "../hooks/useFetchMoviesByName";
import MovieList from "components/MovieList";
import SearchForm from "components/SearchForm";
import { STATUS } from "hooks/status";

function MoviesPage() {
  const { url } = useRouteMatch();
  const { movies, status, error, refetch } = useFetchMoviesByName();

  const onSubmit = async (value) => {
    await refetch(value);
  };

  return (
    <section>
      <h2>Movies</h2>

      <SearchForm submit={onSubmit} />

      {status === STATUS.ERROR && error}

      {status === STATUS.LOADING && "Loading..."}

      {status === STATUS.SUCCESS && (
        <MovieList movie={movies} path={`${url}`} />
      )}
    </section>
  );
}

export default MoviesPage;
