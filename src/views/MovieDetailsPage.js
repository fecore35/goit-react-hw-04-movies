import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import Cast from "components/Cast";
import Reviews from "components/Reviews";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  return (
    <section>
      Details Page
      <Switch>
        <Route path={`${url}/cast`}>
          <Cast />
        </Route>
        <Route path={`${url}/reviews`}>
          <Reviews />
        </Route>
      </Switch>
    </section>
  );
}

export default MovieDetailsPage;
