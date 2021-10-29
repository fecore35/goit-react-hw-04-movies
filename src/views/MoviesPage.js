import { useRouteMatch } from "react-router-dom";
import { useFetchMoviesByName } from "../hooks/useFetchMoviesByName";
import MovieList from "components/MovieList";
import SearchForm from "components/SearchForm";

function MoviesPage() {
  const { url } = useRouteMatch();
  const search = useFetchMoviesByName();

  const onSubmit = async (value) => {
    await search.refetch(value);
  };

  return (
    <section>
      <h2>Movies</h2>

      <SearchForm submit={onSubmit} />
      <MovieList movie={search.movies} path={`${url}`} />
    </section>
  );
}

export default MoviesPage;
