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
import { STATUS } from "hooks/status";

function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const { title, status, error } = useFetchMoviesById(movieId);

  return (
    <>
      <section>
        <BackTo />
        {status === STATUS.ERROR && error}
        {status === STATUS.LOADING && `Loading...`}
        {status === STATUS.SUCCESS && title}
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
