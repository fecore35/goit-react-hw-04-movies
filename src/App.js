import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "components/Header";
import Nav from "components/Nav";

const HomePage = lazy(() =>
  import("views/HomePage" /* webpackChunkName: "home-view" */)
);
const MoviesPage = lazy(() =>
  import("views/MoviesPage" /* webpackChunkName: "movies-view" */)
);

const MovieDetailsPage = lazy(() =>
  import("views/MovieDetailsPage" /* webpackChunkName: "movie-page-view" */)
);

function App() {
  return (
    <div className="App">
      <Header>
        <Nav />
      </Header>

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/movies">
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
