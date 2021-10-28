import { useState, useEffect, useMemo } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { api } from "../services/api";
import { useUrlQuery } from "../hooks/useUrlQuery";
import MovieList from "components/MovieList";

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

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      history.push({
        ...location,
        pathname: `${url}`,
        search: "",
      });
      setMovie(null);
      return;
    }

    history.push({
      ...location,
      search: `query=${searchQuery}`,
    });
    fetchMoviesAsync(searchQuery, 1);
  };

  const handlerSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (!locationQuery) {
      setSearchQuery("");
      setMovie(null);
      return;
    }

    setSearchQuery(locationQuery);
    fetchMoviesAsync(locationQuery, 1);
  }, [locationQuery]);

  return (
    <section>
      <h2>Movies</h2>

      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          value={searchQuery}
          onChange={handlerSearchQuery}
        />
        <button type="submit">Search</button>
      </form>

      {movie && <MovieList movies={movie} path={`${url}`} />}
    </section>
  );
}

export default MoviesPage;
