import { useState, useEffect, useMemo } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { api } from "../services/api";
import { useUrlQuery } from "../hooks/useUrlQuery";
import MovieList from "components/MovieList";
import SearchForm from "components/SearchForm";

function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const query = useUrlQuery();
  const locationQuery = useMemo(() => query.get("query"), [query]);

  const [searchQuery, setSearchQuery] = useState("");
  const [movie, setMovie] = useState(null);

  const fetchMoviesAsync = async (name, page) => {
    try {
      const response = await api.fetchMoviesByName(name, page);
      setMovie(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (value) => {
    setSearchQuery(value);
    history.push({
      ...location,
      search: `query=${value}`,
    });
  };

  useEffect(() => {
    if (!locationQuery) {
      setMovie(null);
      return;
    }
    setSearchQuery(locationQuery);
  }, [locationQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setMovie(null);
      return;
    }
    fetchMoviesAsync(searchQuery);
  }, [searchQuery]);

  return (
    <section>
      <h2>Movies</h2>

      <SearchForm submit={onSubmit} />
      {movie && <MovieList movie={movie} path={`${url}`} />}
    </section>
  );
}

export default MoviesPage;
