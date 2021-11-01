import {
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import useFetchMoviesById from "hooks/useFetchMoviesById";
import BackTo from "components/GoBack";
import Cast from "components/Cast";
import Reviews from "components/Reviews";
import MovieCard from "components/MovieCard";
import { STATUS } from "hooks/status";
import loadingPoster from "../images/poster-loading.png";

function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const { title, date, poster, genres, overview, status, error } =
    useFetchMoviesById(movieId);

  return (
    <>
      <section>
        <BackTo />
        {status === STATUS.ERROR && error}

        {status === STATUS.LOADING && (
          <MovieCard
            title="Loading..."
            date="0000-00-00"
            poster={loadingPoster}
            genres={null}
            overview={null}
          />
        )}

        {status === STATUS.SUCCESS && (
          <MovieCard
            title={title}
            date={date}
            poster={poster}
            genres={genres}
            overview={overview}
          />
        )}
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
