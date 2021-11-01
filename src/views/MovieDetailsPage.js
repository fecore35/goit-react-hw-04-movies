import {
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { useFetchMoviesById } from "../hooks/react-query/useFetchMoviesById";
import BackTo from "components/GoBack";
import Cast from "components/Cast";
import Reviews from "components/Reviews";
import MovieCard from "components/MovieCard";

function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const { data, error, isError, isLoading } = useFetchMoviesById(movieId);

  const location = useLocation();
  const backTo = location?.state?.from ?? { pathname: "/" };
  const backText = location?.state?.label ?? "Go home";

  if (isError) {
    return <h2>Error! {error.message}</h2>;
  }

  if (data.status >= 400 && data.status < 600) {
    return (
      <h2>
        Error {data.status}! {data.message}
      </h2>
    );
  }

  return (
    <>
      <section>
        <BackTo to={backTo} label={backText} />

        <MovieCard
          isLoading={isLoading}
          title={data.title}
          date={data.release_date}
          poster={
            data.poster_path &&
            `https://image.tmdb.org/t/p/w500${data.poster_path}`
          }
          genres={data.genres}
          overview={data.overview}
        />
      </section>

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
    </>
  );
}

export default MovieDetailsPage;
