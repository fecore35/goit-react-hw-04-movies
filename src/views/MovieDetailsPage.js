import { useState, useEffect } from "react";
import {
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { api } from "services/api";
import BackTo from "components/GoBack";
import Cast from "components/Cast";
import Reviews from "components/Reviews";

function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState(null);

  const fetchMoviesAsync = async (id) => {
    try {
      const response = await api.fetchMoviesById(id);
      setMovie(response);
      setTitle(response.title);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMoviesAsync(movieId);
  }, [movieId]);

  return (
    <>
      <section>
        <BackTo />
        {movie && title}
      </section>

      <section>
        <ul>
          <li>
            <NavLink
              to={`${url}/cast`}
              className="link"
              activeClassName="activeLink"
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/reviews`}
              className="link"
              activeClassName="activeLink"
            >
              Reviews
            </NavLink>
          </li>
        </ul>

        <Switch>
          <Route path={`${url}/cast`}>
            <Cast movieId={movieId} />
          </Route>
          <Route path={`${url}/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </Switch>
      </section>
    </>
  );
}

export default MovieDetailsPage;
