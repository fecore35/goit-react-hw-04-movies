import {
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useLocation,
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

  const location = useLocation();
  const backTo = location?.state?.from ?? { pathname: "/" };
  const backText = location?.state?.label ?? "Go home";

  return (
    <>
      <section>
        <BackTo to={backTo} label={backText} />

        {status === STATUS.ERROR && <div>{error}</div>}

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
      {status === STATUS.SUCCESS && (
        <section>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: backTo,
                    label: backText,
                  },
                }}
                className="link"
                activeClassName="activeLink"
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: backTo,
                    label: backText,
                  },
                }}
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
      )}
    </>
  );
}

export default MovieDetailsPage;
