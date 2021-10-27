import { useState, useEffect, useMemo } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { api } from "../services/api";
import { useUrlQuery } from "../hooks/useUrlQuery";

function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const query = useUrlQuery();
  const params = useMemo(() => query.get("query"), [query]);

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
      history.push(`${url}`);
      setMovie(null);
      return;
    }

    history.push(`?query=${searchQuery}`);
    fetchMoviesAsync(searchQuery, 1);
  };

  const handlerSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (!params) {
      setSearchQuery("");
      setMovie(null);
      return;
    }

    setSearchQuery(params);
    fetchMoviesAsync(params, 1);
  }, [params]);

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

      {movie && (
        <ol>
          {movie.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`${url}/${item.id}`}>{item.title}</Link>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

export default MoviesPage;
